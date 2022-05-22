const fs = require('fs');
const path = require('path');
const secretFiles = path.join(__dirname, '/secret-folder');

fs.readdir(secretFiles, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error(err);
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileFormat = file.name.split('.')[1];
        // получить размер каждого файла
        fs.stat(path.join(secretFiles, file.name), (err, stats) => {
          if (err) {
            return console.error(err);
          } else {
            console.log(`${fileName} - ${fileFormat} - ${stats.size} bytes`);
          }
        });
      }
    });
  }
});