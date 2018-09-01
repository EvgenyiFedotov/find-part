import { model as User } from '../../database/users';
import { model as Inout } from '../../database/inout';

function isValid(login, password) {
  if (!login) {
    return { message: 'Login is not valid', status: 'LOGIN' };
  }

  if (!password || password.length < 6) {
    return { message: 'Password is not valid', status: 'PASSWORD' };
  }

  return {};
}

function signUp(params, success, error) {
  let { login, password } = params;

  login = login.trim();
  password = password.trim();

  const { message, status } = isValid(login, password);

  if (!message) {
    new User({ login, password }).save((err) => {
      if (err) {
        error('User exist', 'LOGIN');
      } else {
        success();
      }
    });
  } else {
    error(message, status);
  }
}

function signIn(params, success, error) {
  // success(true, {
  //   cookie: [
  //     {
  //       type: 'erase',
  //       key: 'inout',
  //     },
  //   ],
  // });

  User.findOne().byLoginPassword(params.login, params.password)
    .exec((err, user) => {
      if (user) {
        const { _id } = user;

        Inout.findPublicFormat({
          userId: _id,
          dateOut: undefined,
        }, (inoutErr, inoutRes) => {
          if (inoutRes.length) {
            success(inoutRes, {
              code: 201,
            });
          } else {
            const inout = new Inout({
              userId: _id,
              userAgent: this.headers['user-agent'],
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
        });
      } else {
        error('Error enter login and password!');
      }
    });
}

export default {
  signUp,
  signIn,
};
