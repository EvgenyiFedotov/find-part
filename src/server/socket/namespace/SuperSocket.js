import { dispatch } from './common';

export default class SuperSocket {
  /**
   * @param {Object} [params]
   * @param {Socket} [params.socket]
   * @param {Store} [params.store]
   */
  constructor(params = {}) {
    let namespace = params.namespace || null;
    let socket = params.socket || null;
    let store = params.store || null;

    Object.defineProperties(this, {
      namespace: {
        get: () => namespace,
        set: (namespaceIn) => {
          namespace = namespaceIn;
        },
      },
      socket: {
        get: () => socket,
        set: (socketIn) => {
          socket = socketIn;
        },
      },
      socketId: {
        get: () => {
          if (socket) {
            return socket.id;
          }

          return null;
        },
      },
      store: {
        get: () => store,
        set: (storeIn) => {
          store = storeIn;
        },
      },
    });
  }

  /**
   * @param {Object[]} actions
   * @param {String[]} [rooms]
   */
  dispatchSocket(actions, rooms = []) {
    if (this.socket) {
      dispatch(this.socket, actions, rooms);
    }

    return this;
  }

  /**
   * @param {Object[]} actions
   * @param {String[]} [rooms]
   */
  dispatchNamespace(actions, rooms = []) {
    if (this.namespace) {
      dispatch(this.namespace, actions, rooms);
    }

    return this;
  }

  dispatch(...args) {
    if (this.store) {
      this.store.dispatch(...args);
    }

    return this;
  }

  getState() {
    if (this.store) {
      return this.getState();
    }

    return {};
  }

  emitResult(nameEvent, result) {
    if (this.socket && result !== undefined) {
      this.socket.emit(`${nameEvent}_result`, result);
    }
  }

  /**
   * @param {Object|String} nameEvent
   * @param {Function} [callback]
   */
  subscribe(nameEvent, callback) {
    if (this.socket) {
      if (typeof nameEvent === 'string' && callback instanceof Function) {
        this.socket.on(nameEvent, (...args) => {
          this.emitResult(
            nameEvent,
            callback.call(this, {
              superSocket: this,
              nameEvent,
            }, ...args),
          );
        });
      } else if (nameEvent instanceof Object) {
        const callbacks = nameEvent;

        Object.keys(callbacks).forEach((cbsNameEvent) => {
          let eventCallbacks = callbacks[cbsNameEvent];

          if (eventCallbacks instanceof Function) {
            eventCallbacks = [eventCallbacks];
          }

          eventCallbacks.forEach((cbsCallback) => {
            this.subscribe(cbsNameEvent, cbsCallback);
          });
        });
      }
    }

    return this;
  }
}
