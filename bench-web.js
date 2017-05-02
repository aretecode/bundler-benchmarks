const Bench = require('./.bench-chain')
const {fus, web, roll} = require('./configs')

const name = 'web'

Bench.init(__dirname, `./results-${name}.json`)
  .tags('metal')
  .addAsync('fusebox - ' + name, async done => {
    const eh = await fus(name)
    done(eh)
    return eh
  })
  .addAsync('rollup - ' + name, async done => {
    const eh = await roll(name, 'iife')
    done(eh)
    return eh
  })
  .addAsync('webpack - ' + name, async done => {
    const eh = await web(name, 'web')
    done(eh)
    return eh
  })
  .run()

// web(name, 'dist-web', 'web')
// roll(name, 'dist-web', 'iife')
// Bench
//   .init(__dirname, `./results-${name}.json`)
//   .
