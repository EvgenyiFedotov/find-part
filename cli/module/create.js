const inquirer = require('inquirer');
const fs = require('fs');
const templates = require('./templates');

const questions = [{
  type: 'input',
  name: 'root',
  message: 'Module root path?',
  default: './src',
  validate: (value) => {
    try {
      const dir = fs.statSync(value);

      if (dir.isDirectory()) {
        return true;
      }
    } catch (e) {
      // pass
    }

    return 'Input correct path to root module!';
  },
}, {
  type: 'input',
  name: 'name',
  message: 'Input name module',
  default: 'myModule',
  validate: (value, answers) => {
    if (value) {
      const { root } = answers;
      const client = fs.existsSync(`${root}/client/modules/${value}`);
      const server = fs.existsSync(`${root}/server/modules/${value}`);

      if (!client && !server) {
        return true;
      }

      return 'Module exist!';
    }

    return 'Input correct name module!';
  },
}, {
  type: 'confirm',
  name: 'router',
  message: 'Create module routing?',
}];

const create = (root, config, answers) => {
  if (!(config instanceof Function) && config instanceof Object) {
    fs.mkdirSync(root);

    Object.keys(config).forEach((name) => {
      const isFullName = name.split('.').length > 1;
      const configName = config[name];

      if (configName instanceof Function) {
        const content = configName(answers);

        if (typeof content === 'string') {
          fs.writeFileSync(
            `${root}/${name}${isFullName ? '' : '.js'}`,
            content.replace(/\n/g, '\r\n'),
          );
        } else if (!(content instanceof Function) && content instanceof Object) {
          create(`${root}/${name}`, content, answers);
        }
      } else if (configName instanceof Object) {
        create(`${root}/${name}`, configName, answers);
      }
    });
  }
};

inquirer.prompt(questions).then((answers) => {
  const { root, name } = answers;
  const clientPath = `${root}/client/modules/${name}`;
  const serverPath = `${root}/server/modules/${name}`;

  create(clientPath, templates.client, answers);
  create(serverPath, templates.server, answers);
});
