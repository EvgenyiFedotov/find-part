const inquirer = require('inquirer');
const questions = require('./questions');
const common = require('../../common');

inquirer.prompt(questions).then((answers) => {
  const { nameModule } = answers;

  common.cloneDir(
    `${__dirname}/templates`,
    `./src/client/modules/${nameModule}/component`,
  );
});
