
// Dependencies
const runTests = require('./utils/runTests');
const walkDirectory = require('./utils/walkDirectory');

// Application logic for the test runner
const tests = {};

tests.init = function (homePath) {

  console.log("homePath", homePath);
  console.log('Test Runner inited ...');

  walkDirectory(homePath)
  .then(testingFilePaths => {

    tests.units = testingFilePaths.map(filePath => {
      console.log("filePath", filePath);
      // const subPath = filePath.substr(homePath.length, 10000);
      // console.log("subPath", subPath);
      // const relativePath = PATH_TO_TEST + subPath;
      // const folderPath = subPath.split('__tests__')[0];
      // const fileName = filePath.substr(relativePath.lastIndexOf('/') + 1, 1000);
      const folderPath = filePath.split('__tests__')[0];
      console.log("folderPath", folderPath);
      // console.log("folderPath", folderPath);
      const fileName = filePath.substr(filePath.lastIndexOf('/') + 1, 1000);
      console.log("fileName", fileName);
      // console.log("fileName", fileName);
      const testsContainerObject = require(filePath).default;
      console.log("testsContainerObject", testsContainerObject);
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

