const lodash = require('lodash')
const babel = require('babel-core')
const typescript = require('typescript')
const eslint = require('eslint')
const flowtype = require('flowtype')
const br = require('babel-register')

console.log({lodash, babel, typescript, eslint, flowtype, br})
module.exports = {lodash, babel}
// module.exports.default = module.exports
// module.exports.__esModule = true
