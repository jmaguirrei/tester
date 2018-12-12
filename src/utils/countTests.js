


// Count all the tests
module.exports = function countTests(tests) {

  return tests.reduce((acum, testItem) => {
    const { runnables } = testItem;
    return acum + runnables.length;
  }, 0);

};

