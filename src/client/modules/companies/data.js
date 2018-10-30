import axios from 'axios';

export const types = {
  edit: 'COMPANIES_EDIT',
  delete: 'COMPANIES_DELETE',
  fetch: 'COMPANIES_FETCH',
  set: 'COMPANIES_SET',
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
  fetch: () => ({
    type: types.fetch,
  }),
  set: items => ({
    type: types.set,
    items,
  }),
};

export const defaultStore = [
];

export const defaultCompanies = {
  name: '',
  isPublic: false,
  partners: [],
};

export function reducer(store = defaultStore, action = {}) {
  const {
    type,
    index,
    fields = {},
    items = [],
  } = action;
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
    case types.set:
      return [...items];
    default:
      return store;
  }
}

export const middleware = ({ dispatch }) => next => (action) => {
  const { type, index, fields } = action;
  const apiPath = '/api/companies';

  switch (type) {
    case types.fetch:
      axios.get(`${apiPath}/fetch`)
        .then(({ data }) => {
          const { success, items } = data;

          if (success) {
            dispatch(actions.set(items));
          }
        });

      break;
    case types.edit:
      if (index === -1) {
        axios.post(`${apiPath}/add`, fields)
          .then(({ data }) => {
            console.log('@add', data);
          });
      } else {
        axios.post(`${apiPath}/edit`, fields)
          .then(({ data }) => {
            console.log('@edit', data);
          });
      }

      next(action);
      break;
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
