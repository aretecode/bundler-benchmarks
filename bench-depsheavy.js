const {fus, web, roll} = require('./configs')
const Record = require('../../../../../fluents/package/bench-chain')

// web()
// fus()
// roll()

const name = 'heavydeps'
const {record} = Record.suite(__dirname, false, `./results-${name}.json`)

record
  .tags('metal,deps,' + name)
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

// record.setup().echo()
