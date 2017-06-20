const fs = require('fs');

module.exports = {
  readDir(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  },
  writeFile(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, 'utf-8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
