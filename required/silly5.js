module.exports =  () => {
        const ex = {}
        ex[0] = require('./silly0.js');
ex[1] = require('./silly1.js');
ex[2] = require('./silly2.js');
ex[3] = require('./silly3.js');
ex[4] = require('./silly4.js');

        return ex;
      }