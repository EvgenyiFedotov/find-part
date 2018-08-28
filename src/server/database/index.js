import mongoose from 'mongoose';

import { model } from './inout';

export function connect() {
  const database = mongoose.connection;
  const { error, log } = console;

  mongoose.connect('mongodb://localhost/findPart');

  database.on('error', error.bind(console, 'connection error:'));

  database.once('open', () => {
    log('Open connect with database!');
  });

  // database.dropDatabase();

  // defData();

  // const user = new User({
  //   login: '123',
  //   password: '123123',
  // });

  // user.save(() => {
  //   User.find((err, users) => console.log('users', users));
  // });

  model.find((err, result) => {
    console.log(result);
  });

  return database;
}

export default {
  connect,
};
