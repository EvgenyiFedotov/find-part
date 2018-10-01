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

export function signOut(params, success, error, superSocket) {
  const { inout } = superSocket.cookie;

  Inout.findByIdAndUpdate(inout, {
    dateOut: new Date(),
  }, (errUpdate) => {
    if (!errUpdate) {
      success(true, {
        cookie: [
          {
            type: 'erase',
            key: 'inout',
          },
        ],
      });
    }
  });
}

export default {
  exitDevices,
  signIn,
  signOut,
};
