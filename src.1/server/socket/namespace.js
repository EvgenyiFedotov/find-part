import SuperSocket from '../../common/SuperSocket/server';

/**
 * @param {Namespace} namespaceIn
 * @param {Object} callbacksIn
 * @param {Object} [options]
 * @param {Store} [options.store]
 */
export default function namespace(namespaceIn, callbacksIn = {}, options = {}) {
  const callbacks = callbacksIn;
  const { connection } = callbacks;

  namespaceIn.on('connection', (socket) => {
    const superSocket = new SuperSocket({
      store: options.store,
      socket,
    });

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
}
