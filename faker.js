const {resolve} = require('path')
const faker = require('faker')
const fwf = require('funwithflags')
const File = require('file-chain')
const log = require('fliplog')

const res = rel => resolve(__dirname, rel)

class FakeData {
  static generate(i) {
    return {
      _id: faker.random.uuid(),
      gid: faker.random.uuid(),
      index: i,
      age: faker.random.number(),
      balance: '$' + faker.random.number(),
      name: faker.name.findName(),
      isActive: faker.random.boolean(),
      email: faker.internet.email(),
      card: faker.helpers.createCard(),
      image: faker.image.imageUrl(),
      eyeColor: faker.internet.color(),
      fave: faker.random.word(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      phone: faker.phone.phoneNumber(),
      company: faker.company.bs(),
    }
  }

  static times(iterations = 10) {
    const data = []
    for (let i = iterations; i >= 0; i--)
      data.push(FakeData.generate(i))
    const jsonData = JSON.stringify(data, null, 2)
    return jsonData
  }
}

class FileBuilder {
  static init() {
    return new FileBuilder()
  }
  constructor() {
    this.file = new File()

    this.dir = dirname => {
      this.file.dir(res(`./${dirname}`))
      return this
    }

    this.name = filename => {
      this.file.src(filename)
      return this
    }

    this.ext = ext => {
      this.file.absPath += '.' + ext
      this.file.setContent('')
      return this
    }

    this.append = this.file.append
    this.prepend = this.file.prepend
    this.setContent = this.file.setContent
    this.write = this.file.write
    this.load = this.file.load
  }

  addExports(es = 5) {
    this.file.prepend(es === 6 ? 'export default ' : 'module.exports = ')
    return this
  }
  makeAddImport(es = 5) {
    this.addImport = name => {
      const importStr = `import ${name} from './${name}'\n`
      const requireStr = `const ${name} = require('./${name}')\n`
      this.file.prepend(es === 6 ? importStr : requireStr)
      return this
    }
    return this
  }
}

class Faker {
  // --- data ---

  static build(dirname, es, ext, iterations) {
    return new Faker(dirname, es, ext, iterations).build()
  }

  constructor(dirname, es, ext, iterations) {
    this.opts = {dirname, es, ext, iterations}

    // purposefully not unique on every file
    this.data = FakeData.times(iterations)
  }

  getFile(name) {
    const {dirname, ext, es} = this.opts

    return FileBuilder.init()
      .dir(dirname)
      .name(name) // eh
      .ext(ext)
      .addExports(es)
      .makeAddImport(es)
  }

  // --- build ---

  build() {
    return this.buildEntry().buildBasic().buildBench()
  }

  buildEntry() {
    const file = this.getFile('index')
    // log.quick(file)
    let moduleExports = ``

    for (let i = iterations; i >= 0; i--) {
      const exportName = `silly${i}`
      file.addImport(exportName)
      // log.verbose(100).data(file).bold('adding entry').echo()
      moduleExports += `\t${exportName}, `
    }

    file.append(`{\n ${moduleExports} \n }`).write()
    return this
  }

  buildBench() {
    const testName = this.opts.dirname

    /* prettier-ignore */

    File
      .path(__dirname, 'bench-' + testName + '.js')
      .setContent(`require('./config-bench-factory')('${testName}')\n`)
      .write()

    /* prettier-enable */

    return this
  }

  buildBasic() {
    const {data} = this

    for (let i = iterations; i >= 0; --i) {
      this.getFile(`silly${i}`).append(`() => {return ${data}}`).write()
    }

    return this
  }

  buildRequires() {
    const {data} = this

    for (let i = iterations; i >= 0; --i) {
      // add chain require content
      let requires = ''
      for (let ii = 0; ii < i; ii++) {
        requires += `ex[${ii}] = require('./${'silly' + ii}');\n`
        // const expression = '"s" + "i" + "l" + "l" + "y" + ' + ii
        // requires += `ex[${ii}] =
        // require('./${expression}');\n`
      }

      // create file, set content, write
      const file = this.getFile(`silly${i}`)
      if (i === 0) {
        const content = `() => {return ${data}}`
        file.setContent(content).write()
      }
      else {
        const content = `() => {
          const ex = {}
          ${requires}
          return ex;
        }`
        file.setContent(content).write()
      }
    }

    return this
  }
}

// --- cli ---

const {dirname, es, ext, iterations} = fwf(process.argv.slice(2), {
  string: ['dirname', 'ext', 'es'],
  number: ['es', 'iterations'],
  default: {
    ext: 'js',
    es: 5,
    iterations: 10,
  },
  alias: {
    dir: 'dirname',
  },
})

if (!dirname) {
  log
    .data('\n\n')
    .echo()
    .red('dirname required')
    .data('\n')
    .echo()
    .dim('example: ')
    .echo()
    .bold('node faker --dirname eh')
    .echo()
    .data('\n\n\n')
    .exit(0)
}

Faker.build(dirname, es, ext, iterations)
