const inquirer = require('inquirer');
const questions = require('./questions');
const common = require('../common');

inquirer.prompt(questions).then((answers) => {
  const { nameModule, nameComponent } = answers;

  common.cloneDir(
    `${__dirname}/templates`,
    `./src/client/modules/${nameModule}/components/${nameComponent}`,
    { fileCallback: ({ fileStr }) => fileStr.replace(/NAME_COMPONENT/g, nameComponent), },
  );
});
