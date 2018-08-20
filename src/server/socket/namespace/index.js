import { dispatch, subscribeByCallbacks } from './common';

/**
 * @param {Namespace} namespaceIn
 * @param {Object} callbacksIn
 * @param {Object} [options]
 * @param {Store} [options.store]
 */
export default function namespace(namespaceIn, callbacksIn = {}, options = {}) {
  const callbacks = callbacksIn;
  const { connection } = callbacks;
  const { store } = options;
  let common = {
    store,
    dispatch: store && store.dispatch,
    getState: store && store.getState,
  };

  namespaceIn.on('connection', (socket) => {
    common = {
      ...common,
      socket,
      socketId: socket.id,
      dispatch: {
        socket: (actions, rooms = []) => dispatch(socket, actions, rooms),
        namespace: (actions, rooms = []) => dispatch(namespaceIn, actions, rooms),
      },
      subscribe: (sCallbacks = {}) => subscribeByCallbacks(common, sCallbacks),
    };

    if (connection instanceof Function) {
      connection(common);
    } else if (connection instanceof Array) {
      connection.forEach((callback) => {
        callback(common);
      });
    }

    delete callbacks.connection;

    subscribeByCallbacks(common, callbacks);
  });

  return common;
}
