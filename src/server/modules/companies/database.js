import mongoose from 'mongoose';

export const Companies = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'userId is empty'],
    select: false,
  },
  name: {
    type: String,
  },
  isPublic: {
    type: Boolean,
  },
  partners: {
    type: Number,
    default: 0,
  },
  requests: {
    type: Number,
    default: 0,
  },
  isDelete: {
    type: Boolean,
    default: false,
    select: false,
  },
});

export const Company = mongoose.model('Company', Companies);

export default {
  Companies: {
    schema: Companies,
    models: { Company },
  },
};
