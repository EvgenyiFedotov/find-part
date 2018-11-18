const program = require('commander');

program
  .version('0.0.1')
  .option('-c, --create <path>', 'enable some action');

program.parse(process.argv);

if (program.create) {
  require(`./create/${program.create}`);
} else {
  program.help();
}
