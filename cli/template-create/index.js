const inquirer = require('inquirer');
const questions = require('./questions');
const common = require('../common');

inquirer.prompt(questions).then((answers) => {
  const { name, path } = answers;
  const templatePath = `${__dirname}/../${name}-create`;

  common.cloneDir(`${__dirname}/templates`, templatePath);
  common.cloneDir(path, `${templatePath}/templates`);
});
