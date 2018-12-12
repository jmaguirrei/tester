
// Dependencies
const runTests = require('./utils/runTests');
const walkDirectory = require('./utils/walkDirectory');

// Application logic for the test runner
const tests = {};

tests.init = function (homePath) {

  console.log('Test Runner inited ...');

  walkDirectory(homePath)
  .then(testingFilePaths => {

    tests.units = testingFilePaths.map(filePath => {

      const folderPath = filePath.split('__tests__')[0];
      const fileName = filePath.substr(filePath.lastIndexOf('/') + 1, 1000);
      const testsContainerObject = require(filePath).default;

      const runnables = Object.keys(testsContainerObject).map(key => {
        return {
          name: key,
          fn: testsContainerObject[key],
        };
      });
      return {
        folderPath,
        fileName,
        runnables,
      };
    });
    runTests(tests);
    // process.exit(0);

  });



};

module.exports = tests;

