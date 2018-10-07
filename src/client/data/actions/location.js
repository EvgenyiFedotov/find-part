import types from '../types';

const { location } = types;

export default {
  toPage: url => ({
    type: location.toPage,
    url,
  }),
};
