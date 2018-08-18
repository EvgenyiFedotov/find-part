export const defaultStore = {
  route: 'index',
  mode: null,
};

export const types = {
  set: 'NAV_SET',
  setRoute: 'NAV_SET_ROUTE',
  setMode: 'NAV_SET_MODE',
};

export const actions = {
  set: (route, mode) => ({
    type: types.set,
    route,
    mode,
  }),
  setRoute: route => ({
    type: types.setRoute,
    route,
  }),
  setMode: mode => ({
    type: types.setMode,
    mode,
  }),
};

export default function reducer(store = defaultStore, action) {
  const { route, mode } = action;

  switch (action.type) {
    case types.set:

      return {
        ...store,
        route,
        mode,
      };
    case types.setRoute:
      return {
        ...store,
        route,
      };
    case types.setMode:
      return {
        ...store,
        mode,
      };
    default:
      return store;
  }
}
