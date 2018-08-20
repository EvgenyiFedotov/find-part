/**
 * @param {String} method
 * @param {Object} data
 */
function emit(method, data = {}) {
  this.emit('api', { method, data });
}

function on(method, callback) {
  this.on('api_result', (response) => {
    if (response.method && method === response.method) {
      callback(response.result, response);
    }
  });
}

function once(methodName, callback, errback) {
  this.once('api_result', (response) => {
    const {
      status,
      message,
      method,
      result,
    } = response;

    if (method && method === methodName) {
      if (status === 'OK') {
        callback(result, response);
      } else if (errback instanceof Function) {
        errback(message, status, response);
      }
    } else {
      this.onceApi(methodName, callback);
    }
  });
}

/**
 * @param {Socket} socket
 */
export default function (socket) {
  return {
    emit: emit.bind(socket),
    on: on.bind(socket),
    once: once.bind(socket),
  };
}
