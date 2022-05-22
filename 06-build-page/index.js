const fsp = require('fs/promises');
const path = require('path');
// const fs = require('fs');
const copiedFolder = path.join(__dirname, 'project-dist');



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
}

buildPage();
