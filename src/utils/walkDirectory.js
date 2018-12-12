

const fs = require('fs');
const path = require('path');

// Patterns
const patterns = {
  includeDir: [ '__tests__' ],
  includeFile: [ '.test.js' ],
  excludeDir: [ 'node_modules' ],
};

// shouldBeIncluded
const shouldBeIncluded = filePath => {
  const isDirExcluded = patterns.excludeDir.reduce((acum, value) => {
    return acum && filePath.indexOf(value) > -1;
  }, true);
  const isDirIncluded = patterns.includeDir.reduce((acum, value) => {
    return acum || filePath.indexOf(value) > -1;
  }, false);
  const isFileIncluded = patterns.includeFile.reduce((acum, value) => {
    return acum || filePath.indexOf(value) > -1;
  }, false);
  return !isDirExcluded && isDirIncluded && isFileIncluded;
};


// readdirAsync
const readdirAsync = function (dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => {
      if (err) reject(err);
      resolve(list);
    });
  });
};

// statAsync
const statAsync = function (file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (err) reject(err);
      resolve(stat);
    });
  });
};


// WalkDir
module.exports = function walkDir(dir) {
  return readdirAsync(dir)
  .then(list => {
    return Promise.all(list.map(file => {
      const solvedFile = path.resolve(dir, file);
      return statAsync(solvedFile)
      .then(stat => {
        if (stat.isDirectory()) return walkDir(solvedFile);
        if (shouldBeIncluded(solvedFile)) return solvedFile;
        return [];
      });
    }));
  })
  .then(results => {
    // flatten the array of arrays
    return Array.prototype.concat.apply([], results);
  })
  .catch(console.log);

};


