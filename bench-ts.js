const Bench = require('./.bench-chain')
const {fus, webTS, roll} = require('./configs')

const name = 'ts'

Bench.init(__dirname, `./benchresults/results-${name}.json`)
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
