const types = {};
const actions = {};
const defaultStore = null;
const reducer = (store = defaultStore, action) => {
  const { type } = action;

  switch (type) {
    default:
      return store;
  }
};
const middleware = () => next => (action) => {
  const { type } = action;

  switch (type) {
    default:
      next(action);
      break;
  }
};

export default {
  types,
  actions,
  defaultStore,
  reducer,
  middleware,
};
