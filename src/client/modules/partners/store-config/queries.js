import axios from 'axios';
import uuid from 'uuid/v4';

const getFormatItem = ({
  _id,
  toCompanyId,
  fromCompanyId,
  fromCompanyName,
  toCompanyName,
  toDiscount,
  fromDiscount,
  countTickets,
}) => ({
  _id,
  toCompanyId,
  fromCompanyId,
  fromCompanyName,
  toCompanyName,
  toDiscount,
  fromDiscount,
  countTickets,
});

const types = {
  create: 'QUERIES_CREATE',
  edit: 'QUERIES_EDIT',
};

const actions = {
  create: item => ({
    type: types.create,
    item: getFormatItem(item),
  }),
  edit: (item, values = {}) => ({
    type: types.edit,
    item,
    values,
  }),
};

const defaultStore = [];

const reducer = (store = defaultStore, action) => {
  const { type, item, values } = action;
  let newStore = null;

  console.log(type, item);

  switch (type) {
    case types.create:
      return [
        ...store,
        item,
      ];
    case types.edit:
      newStore = [...store];
      newStore[store.indexOf(item)] = {
        ...item,
        ...values,
      };

      return newStore;
    default:
      return store;
  }
};
const middleware = ({ dispatch }) => next => (action) => {
  const { type, item } = action;

  switch (type) {
    case types.create:
      setTimeout(() => {
        dispatch(actions.edit(item, {
          _id: uuid(),
        }));
      }, 500);
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
