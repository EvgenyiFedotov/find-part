import mongoose from 'mongoose';

export const schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'author is empty'],
  },
  name: mongoose.Schema.Types.String,
  avatar: mongoose.Schema.Types.String,
  public: mongoose.Schema.Types.Boolean,
  created: mongoose.Schema.Types.Date,
});

export const model = mongoose.model('Company', schema);

export default {
  schema,
  model,
};
