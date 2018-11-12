const fs = require('fs');

module.exports = [{
  type: 'input',
  name: 'nameModule',
  message: 'Input name module',
  validate: (value) => {
    const path = `./src/client/modules/${value}/components`;

    if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
      return true;
    }

    return 'Input correct name module!';
  },
}, {
  type: 'input',
  name: 'nameComponent',
  message: 'Input name new component',
  validate: (value, answers) => {
    const { nameModule } = answers;
    const path = `./src/client/modules/${nameModule}/components/${value}`;

    if (!fs.existsSync(path)) {
      return true;
    }

    return `Component with name \`${value}\` exist!`;
  },
}];
