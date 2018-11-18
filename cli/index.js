const program = require('commander');
const fs = require('fs');
const chalkPipe = require('chalk-pipe');

program
  .version('0.0.1');

program
  .command('create [name]')
  .description('run create by template functional area')
  .action((env, options) => {
    console.log(env, options);
  })
  .on('--help', () => {
    console.log('Name:');

    fs.readdirSync(`${__dirname}/create`)
      .forEach(fileName => console.log(chalkPipe('cyan')(`  ${fileName}`)));
  });

program.parse(process.argv);
