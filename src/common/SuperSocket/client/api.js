/**
 * @param {String} method
 * @param {Object} data
 */
function emit(method, data = {}) {
  this.emit('api', { method, data });
}

function onOnce(isOnce, methodName, callback, errback) {
  const action = isOnce ? 'once' : 'on';
  const isCallback = callback instanceof Function;
  const isErrback = errback instanceof Function;

  if (isCallback || isErrback) {
    this[action]('api_result', (response) => {
      const {
        status,
        message,
        method,
        result,
      } = response;

      if (method && method === methodName) {
        if (isCallback && status === 'OK') {
          callback(result, response);
        } else if (isErrback) {
          errback(message, status, response);
        }
      } else if (isOnce) {
        onOnce.call(this, isOnce, methodName, callback, errback);
      }
    });
  }
}

/**
 * @param {Socket} socket
 */
export default function (socket) {
  return {
    emit: emit.bind(socket),
    on: onOnce.bind(socket, false),
    once: onOnce.bind(socket, true),
  };
}
