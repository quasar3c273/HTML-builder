const fs = require('fs');
const path = require('path');

let readFile = fs.createReadStream(path.join(__dirname, 'text.txt'));
let data = '';

readFile.on('data', chunk => data += chunk);
readFile.on('end', () => console.log(data));
readFile.on('error', err => console.log('Error: ', err.message));