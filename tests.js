
require('babel-register')({
  presets: [
    'env',
    'stage-2'
  ]
});

const path = require('path');

require('./src/index.js')
.init({
  belt: path.join(__dirname, '../belt/src/'),
  server: path.join(__dirname, '../server/src/'),
  store: path.join(__dirname, '../store/src/'),
  ui: path.join(__dirname, '../ui/src/'),
});

