import mongoose from 'mongoose';
import md5 from 'md5';

export const Users = new mongoose.Schema({
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

export const User = mongoose.model('user', Users);

export default {
  Users,
};
