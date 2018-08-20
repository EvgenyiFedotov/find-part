import methods from '../methods';

export function connection() {
  console.log('connection');
}

export function api(common, params = {}) {
  const { method, data } = params;
  const methodArr = method.split('/');
  const object = methods[methodArr[0]];
  const objectMethod = object && object[methodArr[1]];
  const success = (result, message) => {
    common.emitResult({
      method,
      status: 'OK',
      result,
      message,
    });
  };
  const error = (message) => {
    common.emitResult({
      method,
      status: 'ERROR',
      message,
    });
  };

  if (objectMethod) {
    objectMethod(data, success, error);
  }
}

export default {
  connection,
  api,
};
