import methods from '../methods';

function checkMessage(message) {
  return typeof message === 'string'
    ? message
    : 'error';
}

export function api(common, params = {}) {
  const { nameEvent } = common;
  const { method, data } = params;
  const methodArr = method.split('/');
  const object = methods[methodArr[0]];
  const objectMethod = object && object[methodArr[1]];

  if (objectMethod) {
    return objectMethod(data, (result, message) => {
      this.emitResult(nameEvent, {
        status: 'OK',
        message: checkMessage(message),
        method,
        result,
      });
    }, (message, statusIn = 'ERROR') => {
      const status = statusIn === 'OK' ? 'ERROR' : statusIn;

      this.emitResult(nameEvent, {
        method,
        status,
        message: checkMessage(message),
      });
    });
  }

  return null;
}

export default {
  api,
};
