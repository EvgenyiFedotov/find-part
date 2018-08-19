import methods from '../methods';

export function connection() {
  console.log('connection');
}

export function api(common, params = {}) {
  const { data } = params;
  let { method } = params;

  method = method.split('/');

  const object = methods[method[0]];
  const objectMethod = object && object[method[1]];

  if (objectMethod) {
    objectMethod(data);
  }
}

export default {
  connection,
  api,
};
