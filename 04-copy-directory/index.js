const fs = require('fs/promises');
const path = require('path');
const mainFolder = path.join(__dirname, 'files');
const copiedFolder = path.join(__dirname, 'files-copy');

async function copyDir(source, target) {
  await fs.rm(target, { recursive: true, force: true });
  await fs.mkdir(target);

  const files = await fs.readdir(source, { withFileTypes: true });
  files.forEach((file) => {
    if (!file.isFile()) {
      copyDir(path.join(source, file.name), path.join(target, file.name));
    } else {
      fs.copyFile(path.join(source, file.name), path.join(target, file.name));
    }
  });
}

copyDir(mainFolder, copiedFolder);