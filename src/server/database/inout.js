import mongoose from 'mongoose';

export const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'userId is empty'],
  },
  dateIn: { type: Date, default: Date.now },
  dateOut: Date,
  userAgent: mongoose.Schema.Types.String,
});

schema.statics.findPublicFormat = function findPublicFormat(filter = {}, callback) {
  return this.model('Inout').find(filter, (err, res) => {
    callback.call(this, err, res.map(inout => inout.publicFormat()));
  });
};

schema.methods.getId = function getId() {
  const { _id } = this;
  return _id;
};

schema.methods.publicFormat = function publicFormat() {
  const { _id } = this;

  return {
    _id,
    dateIn: this.dateIn,
    dateOut: this.dateOut,
    userAgent: this.userAgent,
  };
};

export const model = mongoose.model('Inout', schema);

export default {
  schema,
  model,
};
