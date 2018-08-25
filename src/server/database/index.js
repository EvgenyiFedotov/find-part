import mongoose from 'mongoose';

import { User } from './users';

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

  // User.find((...args) => {
  //   console.log(...args);
  // });

  return database;
}

export default {
  connect,
};
