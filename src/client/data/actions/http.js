import types from '../types';

const { http } = types;

export default {
  get: (url, params = {}, callback = null) => ({
    type: http.get,
    url,
    params,
    callback,
  }),

  post: (url, params, callback = null) => ({
    type: http.post,
    url,
    params,
    callback,
  }),
};
