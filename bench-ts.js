const {fus, webTS, roll} = require('./configs')
const Record = require('../../../../../fluents/package/bench-chain')

// web()
// fus()
// roll()

const name = 'ts'
const {record} = Record.suite(__dirname, false, `./results-${name}.json`)

// webTS(name)

record
  .tags('metal')
  .addAsync('fusebox - ' + name, async done => {
    const eh = await fus(name)
    done(eh)
    return eh
  })
  // .addAsync('rollup - ' + name, async done => {
  //   const eh = await roll(name)
  //   done(eh)
  //   return eh
  // })
  .addAsync('webpack - ' + name, async done => {
    const eh = await webTS(name)
    done(eh)
    return eh
  })
  .run()

// record.setup().echo()
