import SuperSocket from './SuperSocket';

/**
 * @param {Namespace} namespaceIn
 * @param {Object} callbacksIn
 * @param {Object} [options]
 * @param {Store} [options.store]
 */
export default function namespace(namespaceIn, callbacksIn = {}, options = {}) {
  const callbacks = callbacksIn;
  const { connection } = callbacks;
  const superSocket = new SuperSocket({
    namespaceIn,
    store: options.store,
  });

  namespaceIn.on('connection', (socket) => {
    superSocket.socket = socket;

    if (connection instanceof Function) {
      connection(superSocket);
    } else if (connection instanceof Array) {
      connection.forEach((callback) => {
        callback(superSocket);
      });
    }

    delete callbacks.connection;

    superSocket.subscribe(callbacks);
  });

  return superSocket;
}
