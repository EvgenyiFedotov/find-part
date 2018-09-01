export const defaultStore = {
  route: 'auth',
  params: null,
};

export const types = {
  set: 'NAV_SET',
  setRoute: 'NAV_SET_ROUTE',
  setParams: 'NAV_SET_PARAMS',
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
  setParams: params => ({
    type: types.setParams,
    params,
  }),
};

/**
 * @param {Object} params
 */
function checkParams(params) {
  return {
    ...params instanceof Object ? params : {},
  };
}

export function reducer(store = defaultStore, action) {
  const { route, params } = action;

  switch (action.type) {
    case types.set:
      return {
        ...store,
        route,
        params: checkParams(params),
      };
    case types.setRoute:
      return {
        ...store,
        route,
      };
    case types.setParams:
      return {
        ...store,
        params: checkParams(params),
      };
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
