import Io from 'socket.io-client';
import { emit, onOnce } from './api';

export default class SuperSocket {
  /**
   * @param {String} [url]
   * @param {Object} [options]
   */
  constructor(params = {}) {
    let { socket } = params;

    Object.defineProperties(this, {
      socket: {
        get: () => socket,
        set: (value) => {
          socket = value;
        },
      },
    });
  }

  /**
   * @param {String} method
   * @param {Object} data
   */
  apiEmit(...args) {
    if (this.socket) {
      emit.call(this.socket, ...args);
    }
  }

  /**
   * @param {String} methodName
   * @param {Function} callback
   * @param {Function} errback
   */
  apiOn(...args) {
    if (this.socket) {
      onOnce.call(this.socket, false, ...args);
    }
  }

  /**
   * @param {String} methodName
   * @param {Function} callback
   * @param {Function} errback
   */
  apiOnce(...args) {
    if (this.socket) {
      onOnce.call(this.socket, true, ...args);
    }
  }

  /**
   * @param {String} methodName
   * @param  {...any} args
   */
  socketRunMethod(methodName, ...args) {
    if (this.socket) {
      this.socket[methodName](...args);
    }
  }

  /**
   * @param {String[]} [url]
   * @param {Object} options
   */
  static create(url, options = {}) {
    return new SuperSocket({
      socket: new Io(url, {
        transports: ['websocket'],
        upgrade: false,
        ...options,
      }),
    });
  }

  /**
   * @param {Object} [options]
   */
  static createByOptions(options = {}) {
    return SuperSocket.create(undefined, options);
  }
}
