
const formatters = require('./formatters');

const red = '\x1b[31m%s\x1b[0m';

// Product a test outcome report
module.exports = function produceTestReport({ keyPath, limit, successes, errors }) {

  const now = new Date().toJSON();
  const dateStr = now.substr(0, 10) + ' ' + now.substr(11, 8);

  formatters.verticalSpace(2);
  formatters.horizontalLine();
  formatters.verticalSpace(1);
  formatters.centered(keyPath.toUpperCase());
  formatters.centered('TEST REPORT');
  formatters.centered(dateStr);
  formatters.verticalSpace(2);
  formatters.centered(`Total Tests --> ${String(limit).padStart(3, ' ')}`);
  formatters.centered(`       Pass --> ${String(successes).padStart(3, ' ')}`);
  formatters.centered(`       Fail --> ${String(errors.length).padStart(3, ' ')}`);
  formatters.verticalSpace(2);

  // If there are errors, print them in detail
  if (errors.length > 0) {
    formatters.verticalSpace(1);
    formatters.horizontalLine();
    formatters.centered('ERROR DETAILS');
    formatters.horizontalLine();
    formatters.verticalSpace(1);
    console.group();
    console.group();
    errors.forEach(testError => {
      const { folderPath, fileName, counterAsText, name, error } = testError;
      const groupName = `${folderPath}${fileName}`;
      console.group(groupName);
      console.log('');
      console.log(red, `${counterAsText} - ${name}`);
      const { actual, expected } = error;
      console.dir({ actual }, { colors: true, depth: null });
      console.dir({ expected }, { colors: true, depth: null });
      console.log('');
      console.groupEnd(groupName);
    });
    console.groupEnd();
    console.groupEnd();
  }
  formatters.horizontalLine();
  formatters.horizontalLine();
  formatters.verticalSpace(2);

};

