import cookies from 'browser-cookies';

/**
 * @param {String} method
 * @param {Object} data
 */
export function emit(method, data = null) {
  this.emit('api', { method, data });
}

/**
 * @param {Boolean} isOnce
 * @param {String} methodName
 * @param {Function} callback
 * @param {Function} errback
 */
export function onOnce(isOnce, methodName, callback, errback) {
  const action = isOnce ? 'once' : 'on';
  const isCallback = callback instanceof Function;
  const isErrback = errback instanceof Function;

  if (isCallback || isErrback) {
    this[action]('api_result', (response) => {
      if (response instanceof Object) {
        const {
          status,
          message,
          method,
          result,
          cookie,
        } = response;

        if (method && method === methodName) {
          if (isCallback && status === 'OK') {
            if (cookie instanceof Array) {
              /**
               * @param {Object} config
               * @param {String} config.type
               * @param {String} config.key
               * @param {String} config.value
               * @param {Object} [config.options]
               */
              cookie.forEach((config) => {
                const {
                  type,
                  key,
                  value,
                  options,
                } = config;

                if (cookies[type]) {
                  cookies[type](key, value, options);
                }
              });
            }

            callback(result, response);
          } else if (isErrback) {
            errback(message, status, response);
          }
        } else if (isOnce) {
          onOnce.call(this, isOnce, methodName, callback, errback);
        }
      } else {
        console.warn(`api_result is null: method='${methodName}'`);
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
