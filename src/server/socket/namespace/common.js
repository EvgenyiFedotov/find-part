/**
 * @param {Object[]} actions
 * @param {String[]|String} [rooms]
 */
export function dispatch(emitterIn, actions, roomsIn = []) {
  const rooms = (typeof roomsIn === 'string') ? [roomsIn] : roomsIn;
  const emitter = rooms.reduce((memo, nameRoom) => memo.to(nameRoom), emitterIn);

  emitter.emit('dispatch', ...actions);
}

/**
 * @param {Object} common
 * @param {String} nameEvent
 * @param {Function} callback
 */
export function subscribe(common, nameEvent, callback) {
  const { socket } = common;

  socket.on(nameEvent, (...args) => {
    const cbResult = callback(common, ...args) || {};

    if ('result' in cbResult) {
      socket.emit(`${nameEvent}_result`, cbResult.result);
    }
  });
}

/**
 * @param {Object} common
 * @param {Object} callbacks
 */
export function subscribeByCallbacks(common, callbacks = {}) {
  const { socket } = common;

  if (socket) {
    Object.keys(callbacks).forEach((nameEvent) => {
      let eventCallbacks = callbacks[nameEvent];

      if (eventCallbacks instanceof Function) {
        eventCallbacks = [eventCallbacks];
      }

      eventCallbacks.forEach((callback) => {
        subscribe(common, nameEvent, callback);
      });
    });
  }
}

export default {
  dispatch,
  subscribe,
  subscribeByCallbacks,
};
