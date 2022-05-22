const fsp = require('fs/promises');
const path = require('path');
const fs = require('fs');
const copiedFolder = path.join(__dirname, 'project-dist');

// const mainFolder = path.join(__dirname, 'styles');
//
// async function copyDir(source, target) {
//   await fsp.rm(target, { recursive: true, force: true });
//   await fsp.mkdir(target);
//
//   const files = await fsp.readdir(source, { withFileTypes: true });
//   files.forEach((file) => {
//     if (!file.isFile()) {
//       copyDir(path.join(source, file.name), path.join(target, file.name));
//     } else {
//       fsp.copyFile(path.join(source, file.name), path.join(target, file.name));
//     }
//   });
// }

async function buildPage() {
  await fsp.rm(copiedFolder, { recursive: true, force: true });
  await fsp.mkdir(copiedFolder);

  let template = await fsp.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const tags = template.match(/{{\s*([\w-]+)\s*}}/g);

  await fsp.copyFile(path.join(__dirname, 'template.html'), path.join(copiedFolder, 'index.html'));

  for (const tag of tags) {
    let fileName = tag.replace(/[{}]/g, '') + '.html';
    let fileContent = await fsp.readFile(path.join(__dirname, 'components', fileName), 'utf-8');
    let indexTemplate = await fsp.readFile(path.join(copiedFolder, 'index.html'), 'utf-8');
    let newIndexTemplate = indexTemplate.replace(tag, fileContent);
    await fsp.writeFile(path.join(copiedFolder, 'index.html'), newIndexTemplate);
  }

  const folderStyles = path.join(__dirname, 'styles');
  // внутри папки project-dist создать пустой файл style.css

  const endFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  fs.readdir(folderStyles, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      if (path.extname(file.name) === '.css') {
        const readableStream = fs.createReadStream(path.join(folderStyles, file.name));
        readableStream.on('data', chunk => endFile.write(chunk));
      }
    });
  });

  // Копирует папку assets в project-dist/assets
  // await copyDir(mainFolder, copiedFolder);
}

buildPage();
