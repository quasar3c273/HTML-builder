const fs = require('fs');
const path = require('path');
const folderStyles = path.join(__dirname, 'styles');
const endFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

function mergeStyles () {
  fs.readdir(folderStyles, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      if (path.extname(file.name) === '.css') {
        const readableStream = fs.createReadStream(path.join(folderStyles, file.name));
        readableStream.on('data', chunk => endFile.write(chunk));
      }
    });
  });
}

mergeStyles();