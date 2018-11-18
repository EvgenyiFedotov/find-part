const fs = require('fs');

module.exports = [{
  type: 'input',
  name: 'nameModule',
  message: 'Input name module',
  validate: (value) => {
    const path = `./src/client/modules/${value}`;

    if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
      return true;
    }

    return 'Input correct name module!';
  },
}];
