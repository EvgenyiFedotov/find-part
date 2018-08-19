import io from 'socket.io-client';

/**
 * @param {String[]} [url]
 * @param {Object} options
 */
export function create(url, options = {}) {
  return io(url, {
    transports: ['websocket'],
    upgrade: false,
    ...options,
  });
}

/**
 * @param {Socket} socket
 * @param {Object} handlers
 */
export function on(socket, handlers = {}) {
  if (socket && socket.emit) {
    Object.keys(handlers).forEach((nameEvent) => {
      let eventHandlers = handlers[nameEvent];

      if (eventHandlers instanceof Function) {
        eventHandlers = [eventHandlers];
      }

      if (eventHandlers instanceof Array) {
        eventHandlers.forEach((handler) => {
          if (handler instanceof Function) {
            socket.on(nameEvent, handler);
          }
        });
      }
    });
  }
}

/**
 * @param {Socket} socket
 * @param {String} nameEvent
 * @param {Array} [args]
 */
export function emit(socket, nameEvent, ...args) {
  if (socket && socket.emit) {
    socket.emit(nameEvent, ...args);
  }
}

export default {
  create,
  on,
  emit,
};
