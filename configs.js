const {resolve} = require('path')
const log = require('fliplog')
const fun = require('funwithflags')
log.registerCatch()

const res = rel => resolve(__dirname, rel)
const {debug} = fun(process.argv.slice(2), {
  default: {
    debug: false,
  },
  boolean: 'debug',
})

// used to track the cache for subsequent bundles
var cache

function roll(name = 'src', out = 'dist', target = 'cjs') {
  const src = res(`./${name}/index.js`)
  const dist = out + '-' + name
  const rollup = require('rollup')
  const nodeResolve = require('rollup-plugin-node-resolve')
  const commonjs = require('rollup-plugin-commonjs')
  const json = require('rollup-plugin-json')

  const config = {
    entry: src,
    dest: res(`./${dist}/eh-rollup.js`),
    sourceMap: false,
    format: target,
    cache,
    onwarn(message) {
      // ignore
    },
    external: ['fs', 'path', 'tty', 'child_process'],
    plugins: [
      json({
        // All JSON files will be parsed by default,
        // but you can also specifically include/exclude files
        include: '**/**', // Default: undefined
        preferConst: true, // Default: false
      }),
      nodeResolve({
        main: true,
        jsnext: true,
        module: true,
        extensions: ['.js', '.json'], // Default: ['.js']
        preferBuiltins: true,
      }),
      commonjs({
        include: '**/**',
      }),
    ],
  }

  if (target !== 'cjs') {
    config.moduleName = name
  }

  return rollup.rollup(config).then(bundle => {
    cache = bundle
    return Promise.resolve(bundle.write(config))
  })
}

function fus(folder = 'src', out = 'dist', externals = false) {
  let src = `${folder}/index.js`
  const {FuseBox, JSONPlugin, PlainJSPlugin} = require('fuse-box')

  // log.quick(FuseBox, require.resolve('fuse-box'))
  const name = folder + '-fuse'
  const config = {
    log: debug,
    debug,
    homeDir: __dirname,
    cache: true,
    output: out + '-' + folder + '/$name.js',
    plugins: [JSONPlugin(), PlainJSPlugin()],
  }

  const fuse = FuseBox.init(config)

  if (externals === true) src = `[${src}]`
  fuse.bundle(name + '.js').instructions(src)

  return fuse.run()
}

function failed(errors, stats) {
  if (errors) {
    console.error(errors.stack || errors)
    if (errors.details) console.error(errors.details)
    return true
  }
  const jsonStats = stats.toJson()
  if (jsonStats.errors.length) {
    jsonStats.errors.map(error => console.error(error))
    return true
  }
  return false
}

function web(name = 'src', out = 'dist', target = 'node', externals = false) {
  const nodeExternals = require('webpack-node-externals')
  const src = res(`./${name}/index.js`)
  const webpack = require('webpack')
  const config = {
    cache: true,
    context: __dirname,
    target,
    entry: {
      eh: src,
    },
    output: {
      path: res('./' + out + '-' + name),
      filename: '[name]-webpack.js',
    },
  }

  if (target === 'node' && externals === true) {
    config.externals = [nodeExternals()]
  }

  return new Promise((presolve, preject) => {
    const compiler = webpack(config)

    // eslint-disable-next-line consistent-return
    return compiler.run((error, stats) => {
      if (failed(error, stats)) return preject(error)

      // eslint-disable-next-line no-console
      if (debug === true) {
        console.log(
          stats.toString({
            colors: true,
            chunks: false,
            children: false,
          })
        )
      }

      return presolve(stats)
    })
  })
}

function webTS(name = 'src', out = 'dist') {
  const src = res(`./${name}/index.ts`)
  const webpack = require('webpack')
  const config = {
    cache: true,
    context: __dirname,
    target: 'node',
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    // Source maps support ('inline-source-map' also works)
    // devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
      ],
    },

    entry: {
      eh: src,
    },
    output: {
      path: res('./' + name + '-' + out),
      filename: '[name]-webpack.js',
    },
  }

  return new Promise((presolve, preject) => {
    const compiler = webpack(config)

    // eslint-disable-next-line consistent-return
    return compiler.run((error, stats) => {
      if (failed(error, stats)) return preject(error)

      // eslint-disable-next-line no-console
      // console.log(stats.toString({
      //   colors: true,
      //   chunks: false,
      //   children: false,
      // }))
      return presolve(stats)
    })
  })
}

module.exports = {web, roll, fus, webTS}
