import methods from '../methods';

export function connection() {
  console.log('connection');
}

export function api(common, params = {}) {
  const { method, data } = params;
  const methodArr = method.split('/');
  const object = methods[methodArr[0]];
  const objectMethod = object && object[methodArr[1]];

  if (objectMethod) {
    objectMethod(data);
  }

  return {
    method,
    result: 'aaaa',
  };
}

export default {
  connection,
  api,
};
