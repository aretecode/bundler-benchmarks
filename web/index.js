const React = require('react')
// if (typeof global !== 'undefined') global.window = {}
console.log(Object.keys(window))

class Eh extends React.Component {}

console.log(new Eh())
