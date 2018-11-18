const inquirer = require('inquirer');
const fs = require('fs');
const questions = require('./questions');
const common = require('../../common');

const cloneDir = (fromPath, toPath, nameModule) => {
  common.cloneDir(fromPath, toPath, {
    fileCallback: ({ fileStr }) => (
      fileStr.replace(/NAME_MODULE/g, nameModule)
    ),
  });
};

const create = (answers) => {
  const { root, name, page } = answers;
  const clientModulesPath = `${root}/client/modules`;
  const serverModulesPath = `${root}/server/modules`;

  if (!fs.existsSync(clientModulesPath)) {
    throw new Error(`Create dir by path \`${clientModulesPath}\``);
  }

  if (!fs.existsSync(serverModulesPath)) {
    throw new Error(`Create dir by path \`${serverModulesPath}\``);
  }

  cloneDir(
    `${__dirname}/templates/${page ? 'page' : 'component'}/client`,
    `${clientModulesPath}/${name}`,
    name,
  );

  cloneDir(
    `${__dirname}/templates/${page ? 'page' : 'component'}/server`,
    `${serverModulesPath}/${name}`,
    name,
  );
};

inquirer.prompt(questions).then((answers) => {
  create(answers);
});
