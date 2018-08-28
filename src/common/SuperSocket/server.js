import cookies from 'cookie';

export default class SuperSocket {
  /**
   * @param {Object} [params]
   * @param {Socket} [params.socket]
   * @param {Store} [params.store]
   */
  constructor(params = {}) {
    let socket = params.socket || null;
    let store = params.store || null;

    Object.defineProperties(this, {
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
      cookie: {
        get: () => {
          if (socket) {
            return cookies.parse(this.socket.request.headers.cookie);
          }

          return {};
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
      SuperSocket.dispatchEmitter(this.socket, actions, rooms);
    }

    return this;
  }

  /**
   * @param {Object[]} actions
   * @param {String[]} [rooms]
   */
  dispatchConn(actions, rooms = []) {
    if (this.socket) {
      SuperSocket.dispatchEmitter(this.socket.conn, actions, rooms);
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
          const common = {
            superSocket: this,
            nameEvent,
          };
          const result = callback.call(this, common, ...args);

          this.emitResult(nameEvent, result);
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

  /**
   * @param {Socket|Namespace} emitterIn
   * @param {Object[]} actions
   * @param {String[]|String} [rooms]
   */
  static dispatchEmitter(emitterIn, actions, roomsIn = []) {
    const rooms = (typeof roomsIn === 'string') ? [roomsIn] : roomsIn;
    const emitter = rooms.reduce((memo, nameRoom) => memo.to(nameRoom), emitterIn);

    emitter.emit('dispatch', ...actions);
  }

  /**
   * @package {Object} api
   * @param {Object} common
   * @param {String} common.nameEvent
   * @param {SuperSocket} common.superSocket
   * @param {Object} params
   * @param {String} method [format: 'Object/nameMethod']
   * @param {any} data
   */
  static apiHandler(api, common, params = {}) {
    const { nameEvent, superSocket } = common;
    const { method, data } = params;
    const methodArr = method.split('/');
    const object = api[methodArr[0]];
    const objectMethod = object && object[methodArr[1]];

    if (objectMethod instanceof Function) {
      return objectMethod.call(superSocket, data, (result, paramsSuccess = {}) => {
        const { message, code, cookie } = paramsSuccess;

        superSocket.emitResult(nameEvent, {
          status: 'OK',
          code: typeof code === 'number' ? code : 200,
          message: typeof message === 'string' ? message : '',
          cookie: cookie instanceof Object ? cookie : null,
          method,
          result,
        });
      }, (message, paramsError = {}) => {
        const { status, code } = paramsError;

        superSocket.emitResult(nameEvent, {
          status: (status === 'OK' || typeof status !== 'string')
            ? 'ERROR'
            : status,
          code: typeof code === 'number' ? code : 504,
          message: typeof message === 'string' ? message : 'Server error!',
          method,
        });
      });
    }

    return null;
  }
}
