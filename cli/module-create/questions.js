const fs = require('fs');

module.exports = [{
  type: 'input',
  name: 'root',
  message: 'Module root path?',
  default: './src',
  validate: (value) => {
    if (fs.existsSync(value) && fs.statSync(value).isDirectory()) {
      return true;
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
    }

    return 'Input correct name module!';
  },
}, {
  type: 'confirm',
  name: 'page',
  message: 'Сreate a module as a page?',
}];
