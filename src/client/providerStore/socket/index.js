import { create } from './common';

export const types = {
  create: 'SOCKET_CREATE',
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

export default function reducer(store = null, action) {
  switch (action.type) {
    case types.create:
      return create(action.url, action.options);
    case types.set:
      return action.socket;
    case types.remove:
      return null;
    case types.emit:
      store.emit(action.nameEvent, ...action.args);
      break;
    case types.once:
      store.once(action.nameEvent, action.callback);
      break;
    case types.on:
      store.on(action.nameEvent, action.callback);
      break;
    default:
      return store;
  }

  return store;
}
