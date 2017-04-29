const {resolve} = require('path')
const log = require('fliplog')

const res = rel => resolve(__dirname, rel)
const debug = false

function roll(name = 'src', out = 'dist') {
  const src = res(`./${name}/index.js`)
  const rollup = require('rollup')
  const nodeResolve = require('rollup-plugin-node-resolve')
  const commonjs = require('rollup-plugin-commonjs')

  const config = {
    entry: src,
    dest: res(`./${out}/eh-rollup.js`),
    sourceMap: false,
    format: 'cjs',
    plugins: [
      nodeResolve({
        jsnext: true,
      }),
      commonjs({
        include: '**/**',
      }),
    ],
  }

  return rollup
    .rollup(config)
    .then(bundle => Promise.resolve(bundle.write(config)))
}

function fus(folder = 'src', out = 'dist') {
  const src = `${folder}/index.js`
  const {FuseBox} = require('fuse-box')
  // log.quick(FuseBox, require.resolve('fuse-box'))
  const name = 'eh-fuse'
  const config = {
    log: debug,
    debug,
    homeDir: __dirname,
    cache: true,
    output: out + '/$name.js',
  }

  const fuse = FuseBox.init(config)

  fuse.bundle(name + '.js')
    .instructions(src)

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
    jsonStats.errors.map((error) => console.error(error))
    return true
  }
  return false
}

function web(name = 'src', out = 'dist') {
  const src = res(`./${name}/index.js`)
  const webpack = require('webpack')
  const config = {
    cache: true,
    context: __dirname,
    target: 'node',
    entry: {
      eh: src,
    },
    output: {
      path: res('./' + out),
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
      path: res('./' + out),
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
