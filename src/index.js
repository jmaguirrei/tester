
// Dependencies
const getUnits = require('./utils/getUnits');
const runTests = require('./utils/runTests');
const walkDirectory = require('./utils/walkDirectory');

module.exports.init = function (pathsObject) {

  console.log('Test Runner inited ...');

  Object.keys(pathsObject).map(keyPath => {

    const homePath = pathsObject[keyPath];

    return walkDirectory(homePath)
    .then(testingFilePaths => {
      const units = getUnits(testingFilePaths);
      runTests(keyPath, units);
    })
    .catch(console.log);
  });


};

