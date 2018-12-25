
const countTests = require('./countTests');
const produceTestReport = require('./produceTestReport');
const formatters = require('./formatters');

const green = '\x1b[32m%s\x1b[0m';

// Run all the tests, collecting the errors and successes
module.exports = function runTests(keyPath, units) {

  if (units.length === 0) return;

  // console.clear();
  let errors = [];
  let successes = 0;
  const limit = countTests(units);
  let counter = 0;
  let lastFolderPath = '';
  const now = new Date().toJSON();
  const dateStr = now.substr(0, 10) + ' ' + now.substr(11, 8);

  formatters.verticalSpace(10);
  formatters.horizontalLine();
  formatters.horizontalLine();
  formatters.verticalSpace(1);
  formatters.centered(keyPath.toUpperCase());
  formatters.centered('TEST RUNNER');
  formatters.centered(dateStr);
  formatters.verticalSpace(1);

  const done = () => {
    counter++;
    successes++;
    if (counter === limit) produceTestReport({ keyPath, limit, successes, errors });
  };

/* --------------------------------------------------------------------------------------------- */

  units.forEach(testFile => {
    const { folderPath, fileName, runnables } = testFile;

    if (folderPath !== lastFolderPath) {
      formatters.verticalSpace(2);
      console.log(green, `  ${folderPath}`);
      formatters.horizontalLine(green);
      lastFolderPath = folderPath;
    }

    console.log(`  > ${fileName}`);

    runnables.forEach(testItem => {

      const { name, testToRun } = testItem;

      try {
        testToRun();
        // If assert is OK then done will be called, else an error is thrown
        done();

      } catch(error) {
        // If it throws, then it failed, so capture the error thrown and log it in red
        counter++;
        const counterAsText = String(counter).padStart(4, '0');
        errors.push({
          name,
          error,
          counterAsText,
          fileName,
          folderPath,
        });
        console.log('\x1b[31m%s\x1b[0m', `        |- ${counterAsText}   ${name}`);
        if (counter === limit) produceTestReport({ keyPath, limit, successes, errors });
      }
    });
  });

};


