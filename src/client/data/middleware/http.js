import axios from 'axios';

import types, { getTypesValues } from '../types';

const processResult = callback => (result) => {
  if (callback instanceof Function) {
    const { data } = result;

    callback(data, result);
  }
};

export default function http() {
  return () => next => (action) => {
    const { type } = action;

    if (getTypesValues(types.http).indexOf(type) !== -1) {
      const { url, params, callback } = action;

      if (url) {
        if (type === types.http.get) {
          axios.get(url, {
            params,
          }).then(processResult(callback));
        } else if (type === types.http.post) {
          axios.post(url, params).then(processResult(callback));
        }
      }
    } else {
      next(action);
    }
  };
}
