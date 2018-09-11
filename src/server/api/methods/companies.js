import fs from 'fs';
import companies from '../../database/companies';

export function fetch(params, success, error, superSocket) {
  console.log('companies.fetch');
}

export function add(params) {
  console.log(params, __filename);

  fs.writeFile('./dist/client/images/test3.jpg', params.file, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });
}

export default {
  fetch,
  add,
};
