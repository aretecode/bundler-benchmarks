## 📦 install
```bash
git clone git@github.com:aretecode/bundler-benchmarks.git && cd bundler-benchmarks && npm i && node bench
```


# [faker](./faker.js)

> generates out the test files

> just run `node faker --dirname name-of-your-bench` and it generates out src files and bench file

#### full cli arg options are:

```js
{
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
```

# [typescript](./bench-ts.js)
<img width="1037" alt="screen shot 2017-04-30 at 12 39 03 am" src="https://cloud.githubusercontent.com/assets/4022631/25563513/32449f86-2d52-11e7-9384-2b416bc11ebd.png">
# [es5](./bench-es5.js)
# [es6](./bench-es6.js)
<img width="1047" alt="screen shot 2017-04-29 at 3 51 13 am" src="https://cloud.githubusercontent.com/assets/4022631/25559746/a588eb1c-2cf5-11e7-8519-12e1fc87b501.png">

# [small](./bench-small.js)

# [dynamicrequire](./bench-require-dynamic.js)
# [requires](./bench-require.js)
<img width="1035" alt="screen shot 2017-04-30 at 12 28 09 am" src="https://cloud.githubusercontent.com/assets/4022631/25563512/3236cbf4-2d52-11e7-9d3d-b6f40237ecf8.png">

# [deps](./bench-deps.js)
# [deps-heavy](./bench-depsheavy.js)

> ❗ note for dependencies there needs to be a dll config for a more fair comparison

<img width="886" alt="screen shot 2017-04-29 at 4 20 27 am" src="https://cloud.githubusercontent.com/assets/4022631/25559745/a334f298-2cf5-11e7-93cd-3117433062f4.png">
