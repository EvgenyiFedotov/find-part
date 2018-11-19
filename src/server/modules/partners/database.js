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
  fromCompanyName: mongoose.Schema.Types.String,
  toCompanyName: mongoose.Schema.Types.String,
  toDiscount: {
    type: mongoose.Schema.Types.Number,
    default: 5,
  },
  fromDiscount: {
    type: mongoose.Schema.Types.Number,
    default: 5,
  },
  countTickets: {
    type: mongoose.Schema.Types.Number,
    default: 100,
  },
});

const Query = mongoose.model('Query', Queries);

export default {
  Queries,
  Query,
};
