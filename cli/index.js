const program = require('commander');
const fs = require('fs');
const chalkPipe = require('chalk-pipe');
const inquirer = require('inquirer');

program
  .version('0.0.1');

program
  .command('create')
  .description('run create by template functional area')
  .action(() => {
    inquirer.prompt([{
      type: 'list',
      name: 'name',
      choices: fs.readdirSync(`${__dirname}/create`),
    }]).then(({ name }) => {
      require(`${__dirname}/create/${name}`);
    });
  })
  .on('--help', () => {
    console.log('Name:');

    fs.readdirSync(`${__dirname}/create`)
      .forEach(fileName => console.log(chalkPipe('cyan')(`  ${fileName}`)));
  });

program.parse(process.argv);
