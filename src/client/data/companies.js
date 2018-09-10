import md5 from 'md5';

export const defaultStore = [
  {
    _id: '1',
    avatar: '/images/test.jpg',
    name: 'My name company',
    note: `This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
  },
  {
    _id: '2',
    avatar: '/images/test2.jpg',
    name: 'My name company',
    note: `This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
  },
  {
    _id: '3',
    avatar: '/images/test3.jpg',
    name: 'My name company',
    note: `This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
  },
  {
    _id: '4',
    avatar: '/images/test2.jpg',
    name: 'My name company',
    note: `This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
  }, {
    _id: '5',
    avatar: '/images/test2.jpg',
    name: 'My name company',
    note: `This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      This impressive paella is a perfect party dish and a fun meal to cook
      together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
  },
];

export const types = {
  add: 'COMPANIES_ADD',
  edit: 'COMPANIES_EDIT',
};

export const actions = {
  add: params => ({
    type: types.add,
    params,
  }),
  edit: params => ({
    type: types.edit,
    params,
  }),
};

export function reducer(store = defaultStore, actionIn) {
  const newStore = store;
  const action = actionIn;
  let index;

  switch (action.type) {
    case types.add:
      if (!action.params._id) {
        action.params._id = `cid-${md5(new Date().getTime())}`;
      }

      return [
        ...store,
        action.params,
      ];
    case types.edit:
      index = store.reduce((res, item, itemIndex) => {
        if (res === -1 && item._id === action.params._id) {
          return itemIndex;
        }

        return res;
      }, -1);

      if (index !== -1) {
        newStore[index] = action.params;

        return [
          ...newStore,
        ];
      }

      break;
    default:
      return store;
  }

  return store;
}

export default {
  defaultStore,
  types,
  actions,
  reducer,
};
