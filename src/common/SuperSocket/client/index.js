import Io from 'socket.io-client';
import api from './api';

export default class SuperSocket extends Io {
  /**
   * @param {String} [url]
   * @param {Object} [options]
   */
  constructor(url, options = {}) {
    super(url, options);

    this.api = api(this);
  }

  /**
   * @param {String[]} [url]
   * @param {Object} options
   */
  static create(url, options = {}) {
    return new SuperSocket(url, {
      transports: ['websocket'],
      upgrade: false,
      ...options,
    });
  }

  /**
   * @param {Object} [options]
   */
  static createByOptions(options = {}) {
    return SuperSocket.create(undefined, options);
  }
}
