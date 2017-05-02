const {fus, web, roll} = require('./configs')
const Record = require('./.bench-chain')

const name = 'dynamicrequire'
const record = Record.init(__dirname, `./results-${name}.json`)

web(name)
// roll(name)
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
  // .addAsync('webpack - ' + name, async done => {
  //   const eh = await web(name)
  //   done(eh)
  //   return eh
  // })
  .run()

// record.setup().echo()
