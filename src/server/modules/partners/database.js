import mongoose from 'mongoose';

const Queries = new mongoose.Schema({
  fromCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'fromCompanyId is empty'],
  },
  toCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'fromCompanyId is empty'],
  },
});

export default {
  Queries,
};
