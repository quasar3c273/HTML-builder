const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const createdFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));

process.on('exit', () => {
  console.log('Хорошего вам дня, приходите еще!');
});

const writeFileFunction = () => {
  rl.question('Введите текст для записи:', (answer) => {
    if (answer === 'exit') {
      return rl.close();
    }

    createdFile.write(`${answer}\n`);
    writeFileFunction();
  });
};

writeFileFunction();
