export const types = {
  edit: 'COMPANIES_EDIT',
};

export const actions = {
  edit: ({ index, fields }) => ({
    type: types.edit,
    index,
    fields,
  }),
};

export const defaultStore = [];

export function reducer(store = defaultStore, action = {}) {
  const { type, index, fields = {} } = action;
  const { name } = fields;
  const setItem = { name };
  const newStore = [...store];

  switch (type) {
    case types.edit:
      if (index === -1) {
        newStore.push(setItem);
      } else {
        newStore[index] = {
          ...newStore[index],
          ...setItem,
        };
      }

      return newStore;
    default:
      return store;
  }
}

export default {
  types,
  actions,
  defaultStore,
  reducer,
};
