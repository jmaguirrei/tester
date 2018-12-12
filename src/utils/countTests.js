


// Count all the tests
export default function countTests(tests) {

  return tests.reduce((acum, testItem) => {
    const { runnables } = testItem;
    return acum + runnables.length;
  }, 0);

}

