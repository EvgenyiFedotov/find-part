import request from 'request';

function add({ dispatch, getState }) {
  return next => (action) => {
    console.log('@1', dispatch, getState(), next, action);

    request.get(`${location.origin}/api`, (err, res, body) => {
      const bodyObj = JSON.parse(body);

      next({
        type: 'CHANGE',
        test: bodyObj.test,
      });
    });
  };
}