
// Dependencies
import path from 'path';
import runTests from './utils/runTests';
import walkDirectory from './utils/walkDirectory';

// Override the NODE_ENV variable
process.env.NODE_ENV = 'testing';
const PATH_TO_TEST = '../src/';


// Application logic for the test runner
const tests = {};

tests.init = async function () {


  const homePath = path.join(__dirname, PATH_TO_TEST);
  const testingFilePaths = await walkDirectory(homePath);

  tests.units = testingFilePaths.map(filePath => {
    const subPath = filePath.substr(homePath.length, 10000);
    const relativePath = PATH_TO_TEST + subPath;
    const folderPath = subPath.split('__tests__')[0];
    const fileName = relativePath.substr(relativePath.lastIndexOf('/') + 1, 1000);
    const testsContainerObject = require(relativePath).default;
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

};

tests.init();

