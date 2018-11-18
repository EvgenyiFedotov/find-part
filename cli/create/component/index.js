const inquirer = require('inquirer');
const fs = require('fs');
const questions = require('./questions');
const common = require('../../common');

inquirer.prompt(questions).then((answers) => {
  const { nameModule, nameComponent, isPublic } = answers;
  const publicPath = isPublic ? 'public/' : '';
  const path = `./src/client/modules/${nameModule}/components/${publicPath}`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  common.cloneDir(
    `${__dirname}/templates`,
    `${path}${nameComponent}`,
    { fileCallback: ({ fileStr }) => fileStr.replace(/NAME_COMPONENT/g, nameComponent) },
  );
});
