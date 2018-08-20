import methods from '../methods';

function checkMessage(message) {
  return typeof message === 'string'
    ? message
    : 'error';
}

export function connection() {
  console.log('connection');
}

export function api(common, params = {}) {
  const { method, data } = params;
  const methodArr = method.split('/');
  const object = methods[methodArr[0]];
  const objectMethod = object && object[methodArr[1]];

  if (objectMethod) {
    return objectMethod(data, (result, message) => {
      common.emitResult({
        method,
        status: 'OK',
        result,
        message: checkMessage(message),
      });
    }, (message, statusIn = 'ERROR') => {
      const status = statusIn === 'OK' ? 'ERROR' : statusIn;

      common.emitResult({
        method,
        status,
        message: checkMessage(message),
      });
    });
  }

  return null;
}

export default {
  connection,
  api,
};
