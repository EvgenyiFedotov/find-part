import axios from 'axios';

import types, { getTypesValues } from '../types';

export default function http() {
  return () => next => (action) => {
    const { type } = action;

    if (getTypesValues(types.http).indexOf(type) !== -1) {
      const { url, params, callback } = action;

      if (url) {
        if (type === types.http.get) {
          axios.get(url, {
            params,
          }).then((...args) => {
            console.log(args);
          });
        } else if (type === types.http.post) {
          axios.post(url, params).then((...args) => {
            console.log(args);
          });
        }
      }
    } else {
      next(action);
    }
  };
}
