import SuperSocket from '../../common/SuperSocket/client';

export const defaultStore = {
  socket: null,
  callStack: [],
};

export const types = {
  create: 'SOCKET_CREATE',
  createByOptions: 'SOCKET_CREATE_BY_OPTIONS',
  set: 'SOCKET_SET',
  remove: 'SOCKET_REMOVE',
  runMethod: 'SOCKET_RUN_METHOD',
};

export const actions = {
  create: (url, options) => ({
    type: types.create,
    url,
    options,
  }),
  createByOptions: options => ({
    type: types.createByOptions,
    options,
  }),
  set: socket => ({
    type: types.set,
    socket,
  }),
  remove: () => ({ type: types.remove }),
  runMethod: (nameMethod, ...args) => ({
    type: types.runMethod,
    nameMethod,
    args,
  }),
};

/**
 * @param {SuperSocket} socket
 * @param {Object[]} callStack
 */
function setCallStack(socket, callStack) {
  callStack.forEach((action) => {
    socket[action.nameMethod](...action.args);
  });

  return socket;
}

/**
 * @param {Object} store
 * @param {SuperSocket} socket
 */
function setSocket(store, socket) {
  return {
    socket: setCallStack(socket, store.callStack),
    callStack: [],
  };
}

/**
 * @param {Object} store
 * @param {String} nameMethod
 * @param {Array} args
 */
function socketRunMethod(store, nameMethod, args) {
  if (store.socket) {
    store.socket[nameMethod](...args);
  } else {
    store.callStack.push({ nameMethod, args });
  }
}

export function reducer(store = defaultStore, action) {
  switch (action.type) {
    case types.create:
      return setSocket(store, SuperSocket.create(action.url, action.options));
    case types.createByOptions:
      return setSocket(store, SuperSocket.createByOptions(action.options));
    case types.set:
      return setSocket(store, action.socket);
    case types.remove:
      return { socket: null, callStack: [] };
    case types.runMethod:
      socketRunMethod(store, action.nameMethod, action.args);
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
