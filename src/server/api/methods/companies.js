import { Buffer } from 'buffer';
import fs from 'fs';
import companies from '../../database/companies';

export function fetch(params, success, error, superSocket) {
  console.log('companies.fetch');
}

export function add(params) {
  const buf = Buffer.from(params.avatar, 'base64').toString('binary');
  console.log('add', params);
  console.log(buf);

  fs.writeFile('test.jpg', buf, 'binary', (err) => {
    console.log(err);

    // if (err) {
      // console.log('err', err);
    // } else {
      // return res.json({'status': 'success'});
    // }
  });
}

export default {
  fetch,
  add,
};
