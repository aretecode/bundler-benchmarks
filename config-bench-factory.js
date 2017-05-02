const Bench = require('./.bench-chain')
const {fus, web, roll} = require('./configs')

module.exports = function(name, tags = '') {
  if (!name) throw new Error('bench factory requires name')

  /* prettier-ignore */

  // could also do
  // `done => fus(name).then(done)`
  return Bench.init(__dirname, `./results-${name}.json`)
    .tags('metal,factory,fuse-beta8,fuse-beta9' + tags)
    .addAsync('fusebox - ' + name, async done => {
      const eh = await fus(name)
      done(eh)
      return eh
    })
    .addAsync('rollup - ' + name, async done => {
      const eh = await roll(name).then(done)
      done(eh)
      return eh
    })
    .addAsync('webpack - ' + name, async done => {
      const eh = await web(name)
      done(eh)
      return eh
    })
    .run()
}
