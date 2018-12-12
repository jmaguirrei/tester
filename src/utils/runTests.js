
import countTests from './countTests';
import produceTestReport from './produceTestReport';
import getFunctionParams from './getFunctionParams';
import formatters from './formatters';

const green = '\x1b[32m%s\x1b[0m';

// Run all the tests, collecting the errors and successes
export default function runTests(tests) {

  // console.clear();
  let errors = [];
  let successes = 0;
  const limit = countTests(tests.units);
  let counter = 0;
  let lastFolderPath = '';
  const now = new Date().toJSON();
  const dateStr = now.substr(0, 10) + ' ' + now.substr(11, 8);

  formatters.verticalSpace(10);
  formatters.horizontalLine();
  formatters.verticalSpace(1);
  formatters.centered('TEST RUNNER');
  formatters.centered(dateStr);
  formatters.verticalSpace(1);
  formatters.horizontalLine();

  tests.units.forEach(testFile => {
    const { folderPath, fileName, runnables } = testFile;
    if (folderPath !== lastFolderPath) {
      formatters.verticalSpace(2);
      // formatters.horizontalLine();
      console.log(green, `  ${folderPath}`);
      formatters.horizontalLine(green);
      lastFolderPath = folderPath;
    }
    console.log(`  > ${fileName}`);
    runnables.forEach(testItem => {

      const { name, fn } = testItem;

      const done = () => {
        // If it calls back without throwing, then it succeeded, so log it in green
        counter++;
        successes++;
        // const counterAsText = String(counter).padStart(4, '0');
        // console.log('\x1b[32m%s\x1b[0m', `        |- ${counterAsText}   ${name}`);
        if (counter === limit) {
          produceTestReport({ limit, successes, errors });
        }
      };

      try {
        const fnExpectCallback = getFunctionParams(fn).includes('done');
        if (fnExpectCallback) {
          fn({ done, tests });
        } else {
          fn({ tests });
          done();
        }
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
        if (counter === limit) {
          produceTestReport({ limit, successes, errors });
        }
      }
    });
  });

}


