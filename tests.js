
require('babel-register')({
  presets: [ 'env' ]
});

const path = require('path');

require('./src/index.js').init(path.join(__dirname, '../belt/src/'));

