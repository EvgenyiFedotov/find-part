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
  const commonExtends = { ...common };

  commonExtends.emitResult = (result) => {
    if (result instanceof Object) {
      socket.emit(`${nameEvent}_result`, result);
    }
  };

  socket.on(nameEvent, (...args) => {
    commonExtends.emitResult(
      callback(commonExtends, ...args),
    );
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
