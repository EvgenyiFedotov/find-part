const inquirer = require('inquirer');
const questions = require('./questions');

inquirer.prompt(questions).then((answers) => {
  console.log(answers);
});
