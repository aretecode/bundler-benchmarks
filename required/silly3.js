module.exports =  () => {
        const ex = {}
        ex[0] = require('./silly0.js');
ex[1] = require('./silly1.js');
ex[2] = require('./silly2.js');

        return ex;
      }