import types from '../types';

export const defStore = {
  value: null,
  params: {},
};

export default function navigation(store = defStore, action) {
  switch (action.type) {
    case types.navigation.value:
      return {
        ...store,
        value: action.value,
      };
    case types.navigation.params:
      return {
        ...store,
        params: action.params,
      };
    default:
      return store;
  }
}
