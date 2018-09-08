export const defaultStore = [];

export const types = {

};

export const actions = {

};

export function reducer(store = defaultStore, action) {
  switch (action.type) {
    default:
      return store;
  }
}

export default {
  defaultStore,
  types,
  actions,
  reducer,
};
