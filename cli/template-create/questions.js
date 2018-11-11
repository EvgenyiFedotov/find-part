const fs = require('fs');

module.exports = [{
  type: 'input',
  name: 'name',
  message: 'Insert name tempale',
  validate: (value) => {
    if (value && !fs.existsSync(`${__dirname}/../${value}-create`)) {
      return true;
    }

    return 'Tempalte with insert name is exist!';
  },
}, {
  type: 'input',
  name: 'path',
  message: 'Insert path to tempale',
  validate: (value) => {
    if (value && fs.existsSync(value)) {
      return true;
    }

    return 'Insert path to template please ^_^';
  },
}];
