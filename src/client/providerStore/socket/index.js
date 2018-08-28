import SuperSocket from '../../../common/SuperSocket/client';

export const defaultStore = {
  socket: null,
  callStack: [],
};

export const types = {
  create: 'SOCKET_CREATE',
  createByOptions: 'SOCKET_CREATE_BY_OPTIONS',
  set: 'SOCKET_SET',
  remove: 'SOCKET_REMOVE',
  emit: 'SOCKET_EMIT',
  once: 'SOCKET_ONCE',
  on: 'SOCKET_ON',
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
  emit: (nameEvent, ...args) => ({
    type: types.emit,
    nameEvent,
    args,
  }),
  once: (nameEvent, callback) => ({
    type: types.once,
    nameEvent,
    callback,
  }),
  on: (nameEvent, callback) => ({
    type: types.on,
    nameEvent,
    callback,
  }),
};

/**
 * @param {SuperSocket} socket
 * @param {Object[]} callStack
 */
function setCallStack(socket, callStack) {
  callStack.forEach((action) => {
    socket[action.type](...action.args);
  });

  return socket;
}

export function reducer(store = defaultStore, action) {
  switch (action.type) {
    case types.create:
      return {
        socket: setCallStack(
          SuperSocket.create(action.url, action.options),
          store.callStack,
        ),
        callStack: [],
      };
    case types.createByOptions:
      return {
        socket: setCallStack(
          SuperSocket.createByOptions(action.options),
          store.callStack,
        ),
        callStack: [],
      };
    case types.set:
      return {
        socket: setCallStack(
          action.socket,
          store.callStack,
        ),
        callStack: [],
      };
    case types.remove:
      return {
        socket: null,
        callStack: [],
      };
    case types.emit:
      if (store.socket) {
        store.socket.emit(action.nameEvent, ...action.args);
      } else {
        store.callStack.push({
          type: 'emit',
          args: [
            action.nameEvent,
            ...action.args,
          ],
        });
      }
      break;
    case types.once:
      if (store.socket) {
        store.socket.once(action.nameEvent, action.callback);
      } else {
        store.callStack.push({
          type: 'once',
          args: [
            action.nameEvent,
            action.callback,
          ],
        });
      }
      break;
    case types.on:
      if (store.socket) {
        store.socket.on(action.nameEvent, action.callback);
      } else {
        store.callStack.push({
          type: 'on',
          args: [
            action.nameEvent,
            action.callback,
          ],
        });
      }
      break;
    default:
      return store;
  }

  return store;
}

export default {
  types,
  actions,
  reducer,
};
