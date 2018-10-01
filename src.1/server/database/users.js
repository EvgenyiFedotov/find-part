import mongoose from 'mongoose';
import md5 from 'md5';

export const schema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    set: value => md5(value),
  },
});

schema.query.byLoginPassword = function byLoginPassword(login, password) {
  return this.where({
    login,
    password,
  });
};

export const model = mongoose.model('User', schema);

export default {
  schema,
  model,
};
