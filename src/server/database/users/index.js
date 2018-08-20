import mongoose from 'mongoose';
import md5 from 'md5';

export const schema = new mongoose.Schema({
  login: { type: String, unique: true },
  password: String,
});

schema.pre('save', function preSave(next, params, error) {
  let { login, password } = this;
  let isValid = true;

  login = login.trim();
  password = password.trim();

  if (!login || password.length < 6) {
    isValid = false;
  }

  if (isValid) {
    this.login = login;
    this.password = md5(password);

    next();
  } else {
    next(true);
  }
});

export const User = mongoose.model('User', schema);

export default {
  schema,
  User,
};
