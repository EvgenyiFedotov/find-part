export const types = {
  edit: 'COMPANIES_EDIT',
  delete: 'COMPANIES_DELETE',
};

export const actions = {
  edit: ({ index, fields }) => ({
    type: types.edit,
    index,
    fields,
  }),
  delete: index => ({
    type: types.delete,
    index,
  }),
};

export const defaultStore = [
  { name: 'Название моей компании', isPublic: false, partners: [] },
  { name: 'Моя новая компания', isPublic: true, partners: [] },
  { name: 'Моя компания с парнтерами', isPublic: true, partners: [1, 2, 3] },
];

export const defaultCompanies = {
  name: '',
  isPublic: false,
  partners: [],
};

export function reducer(store = defaultStore, action = {}) {
  const { type, index, fields = {} } = action;
  const setItem = {
    ...(Object.keys(defaultCompanies).reduce((result, key) => ({
      ...result,
      [key]: fields[key] || result[key],
    }), defaultCompanies)),
  };
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
    case types.delete:
      if (index !== -1) {
        newStore.splice(index, 1);
        return newStore;
      }

      return store;
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
