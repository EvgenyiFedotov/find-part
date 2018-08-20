import mongoose from 'mongoose';
import md5 from 'md5';

export const schema = new mongoose.Schema({
  login: { type: String, unique: true },
  password: String,
});

schema.pre('save', function preSave(next) {
  this.password = md5(this.password);
  next();
});

export const User = mongoose.model('User', schema);

export default {
  schema,
  User,
};
