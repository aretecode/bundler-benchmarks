module.exports =  () => {
        const ex = {}
        ex[0] = require('./silly0.js');
ex[1] = require('./silly1.js');

        return ex;
      }