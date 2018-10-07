/* global location */

import types from '../types';

export default function () {
  return () => next => (action) => {
    const { type } = action;

    if (type === types.location.toPage) {
      location.pathname = action.url;

      console.log(action);
    } else {
      next(action);
    }
  };
}
