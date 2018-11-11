import axios from 'axios';
import uuid from 'uuid/v4';

export const types = {
  add: 'COMPANIES_ADD',
  editByCid: 'COMPANIES_EDIT_BY_CID',
  edit: 'COMPANIES_EDIT',
  write: 'COMPANIES_WRITE',
  delete: 'COMPANIES_DELETE',
  fetch: 'COMPANIES_FETCH',
  set: 'COMPANIES_SET',
};

export const actions = {
  write: (item) => {
    let type = types.add;
    const setItem = { ...item };
    const { _id, cid } = item;

    if (_id && !cid) {
      type = types.edit;
    } else if (cid) {
      type = types.editByCid;
    } else {
      setItem.cid = uuid();
    }

    return {
      item: setItem,
      type,
    };
  },
  delete: item => ({
    type: types.delete,
    item,
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
    item,
    items = [],
  } = action;

  switch (type) {
    case types.add:
      return [
        item,
        ...store,
      ];
    case types.editByCid:
      return store.map((storeItem) => {
        if (storeItem.cid === item.cid) {
          const { cid, ...setItem } = item;
          return setItem;
        }

        return storeItem;
      });
    case types.edit:
      return store.map((storeItem) => {
        if (storeItem._id === item._id) {
          return item;
        }

        return storeItem;
      });
    case types.delete:
      return store.filter(storeItem => storeItem._id !== item._id);
    case types.set:
      return [...items];
    default:
      return store;
  }
}

export const middleware = ({ dispatch }) => next => (action) => {
  const { type, item } = action;
  const companiesApiPath = '/api/companies';
  const companyApiPath = '/api/companies/company';

  switch (type) {
    case types.fetch:
      axios.get(`${companiesApiPath}`)
        .then(({ data }) => {
          const { success, items } = data;

          if (success) {
            dispatch(actions.set(items));
          }
        });

      break;
    case types.add:
      axios.post(`${companyApiPath}`, item).then(({ data }) => {
        const { _id } = data;

        dispatch(actions.write({
          ...item,
          _id,
        }));
      });

      next(action);
      break;
    case types.edit:
      axios.put(`${companyApiPath}`, item);
      next(action);
      break;
    case types.delete:
      axios.delete(`${companyApiPath}`, {
        params: {
          _id: item._id,
        },
      });
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
