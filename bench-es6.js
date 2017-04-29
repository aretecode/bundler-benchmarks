const {fus, web, roll} = require('./configs')
const Record = require('bench-chain')

const name = 'es6'
const {record} = Record.suite(__dirname, false, `./results-${name}.json`)

record
  .tags('metal')
  .addAsync('fusebox - ' + name, async done => {
    const eh = await fus(name)
    done(eh)
    return eh
  })
  .addAsync('rollup - ' + name, async done => {
    const eh = await roll(name)
    done(eh)
    return eh
  })
  .addAsync('webpack - ' + name, async done => {
    const eh = await web(name)
    done(eh)
    return eh
  })
  .run()
