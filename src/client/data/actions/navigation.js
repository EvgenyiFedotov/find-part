import types from '../types';

const { navigation } = types;

export default {
  value: value => ({
    type: navigation.value,
    value,
  }),

  params: params => ({
    type: navigation.params,
    params: params instanceof Object ? params : {},
  }),
};
