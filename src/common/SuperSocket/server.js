import cookies from 'cookie';

export default class SuperSocket {
  /**
   * @param {Object} [params]
   * @param {Socket} [params.socket]
   * @param {Store} [params.store]
   */
  constructor(params = {}) {
    let socket = null;
    let store = null;

    this.cookie = {};

    this.cache = {
      ...(params.cache || {}),
    };

    Object.defineProperties(this, {
      socket: {
        get: () => socket,
        set: (socketIn) => {
          socket = socketIn;
          this.cookie = cookies.parse(socket.request.headers.cookie || '');
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
      headers: {
        get: () => {
          if (socket) {
            return socket.handshake.headers;
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

    this.socket = params.socket || null;
    this.store = params.store || null;
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
   * @param {Object} values
   */
  setCache(values) {
    if (values instanceof Object) {
      this.cache = {
        ...this.cache,
        ...values,
      };
    }
  }

  /**
   * @param {Object[]} cookieValues
   */
  setCookie(cookieValues) {
    if (cookieValues instanceof Array) {
      cookieValues.forEach((cookieValue) => {
        const { type, key, value } = cookieValue;

        if (type === 'set') {
          this.cookie[key] = value;
        } else if (type === 'erase') {
          delete this.cookie[key];
        }
      });
    }
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
        const { message, code } = paramsSuccess;
        let { cookie } = paramsSuccess;

        cookie = cookie instanceof Object ? cookie : null;
        superSocket.setCookie(cookie);

        superSocket.emitResult(nameEvent, {
          status: 'OK',
          code: typeof code === 'number' ? code : 200,
          message: typeof message === 'string' ? message : '',
          cookie,
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
      }, superSocket);
    }

    return null;
  }
}
