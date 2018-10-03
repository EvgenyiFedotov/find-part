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

export const User = mongoose.model('User', Users);

export const Sessions = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'userId is empty'],
  },
  dateIn: { type: Date, default: Date.now },
  dateOut: Date,
  userAgent: mongoose.Schema.Types.String,
});

export const Session = mongoose.model('Sessions', Sessions);

export default {
  Users: {
    schema: Users,
    models: { User },
  },
  Sessions: {
    schema: Sessions,
    models: { Session },
  },
};
