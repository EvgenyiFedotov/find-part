import io from 'socket.io-client';

/**
 * @param {String} method
 * @param {Object} data
 */
function emitApi(method, data = {}) {
  this.emit('api', { method, data });
}

function onApi(method, callback) {
  this.on('api_result', (response) => {
    if (response.method && method === response.method) {
      callback(response.result);
    }
  });
}

function onceApi(method, callback) {
  this.once('api_result', (response) => {
    if (response.method && method === response.method) {
      callback(response.result);
    } else {
      this.onceApi(method, callback);
    }
  });
}

/**
 * @param {String[]} [url]
 * @param {Object} options
 */
export function create(url, options = {}) {
  const socket = io(url, {
    transports: ['websocket'],
    upgrade: false,
    ...options,
  });

  socket.emitApi = emitApi.bind(socket);
  socket.onApi = onApi.bind(socket);
  socket.onceApi = onceApi.bind(socket);

  return socket;
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
