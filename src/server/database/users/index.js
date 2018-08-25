import mongoose from 'mongoose';
import md5 from 'md5';

export const schema = new mongoose.Schema({
  login: { type: String, unique: true, index: true },
  password: String,
});

schema.query.byLoginPassword = function byLoginPassword(login, password) {
  return this.where({
    login,
    password: md5(password),
  });
};

schema.pre('save', function preSave(next) {
  this.password = md5(this.password);
  next();
});

export const User = mongoose.model('User', schema);

export default {
  schema,
  User,
};
