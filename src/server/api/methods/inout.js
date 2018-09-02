import { model as Inout } from '../../database/inout';

/**
 * @param {String[]} ids
 */
export function exitDevices(ids, success) {
  Inout.updateMany({
    _id: {
      $in: ids,
    },
  }, {
    dateOut: new Date(),
  }, (errUpdateMany) => {
    if (!errUpdateMany) {
      success(ids);
    }
  });
}

export function signIn(params, success, error, superSocket) {
  const { user } = superSocket.cache;

  if (user) {
    const { _id } = user;

    const inout = new Inout({
      userId: _id,
      userAgent: superSocket.headers['user-agent'],
    });

    inout.save(() => {
      success(true, {
        cookie: [
          {
            type: 'set',
            key: 'inout',
            value: inout.getId(),
          },
        ],
      });
    });
  }
}

export default {
  exitDevices,
  signIn,
};
