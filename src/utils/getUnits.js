
// Dependencies

module.exports = function getUnits(testingFilePaths) {

  return testingFilePaths.map(filePath => {

    const folderPath = filePath.split('__tests__')[0];
    const fileName = filePath.substr(filePath.lastIndexOf('/') + 1, 1000);
    const testsContainerObject = require(filePath).default;

    const runnables = Object.keys(testsContainerObject).map(key => {
      return {
        name: key,
        testToRun: testsContainerObject[key],
      };
    });
    return {
      folderPath,
      fileName,
      runnables,
    };
  });


};

