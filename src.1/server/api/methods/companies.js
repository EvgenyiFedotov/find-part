import fs from 'fs';
import companies from '../../database/companies';

const createDir = (dir) => {
  const splitPath = dir.split('/');

  splitPath.reduce((path, subPath) => {
    let currentPath;

    if (subPath !== '.') {
      currentPath = `${path}/${subPath}`;

      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath);
      }
    } else {
      currentPath = subPath;
    }

    return currentPath;
  }, '');
};

export function fetch(params, success, error, superSocket) {
  console.log('companies.fetch');
}

export function add(params, success, error, superSocket) {
  console.log(params, superSocket.cookie, superSocket.cache);

  const dir = './dist/client/users/user#1';

  createDir(dir);

  // fs.writeFile('./dist/client/images/test3.jpg', params.file, (err) => {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   console.log('The file was saved!');
  // });
}

export default {
  fetch,
  add,
};
