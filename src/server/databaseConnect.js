import mongoose from 'mongoose';

export default function databaseConnect() {
  const database = mongoose.connection;
  const { error, log } = console;

  mongoose.connect('mongodb://localhost/findPart', {
    useNewUrlParser: true,
  });

  database.on('error', error.bind(console, 'connection error:'));

  database.once('open', () => {
    log('Open connect with database!');
  });

  return database;
}
