import { User } from '../../database/users';

export default {
  signup: (params, success, error) => {
    const { login, password1, password2 } = params;

    if (password1 === password2) {
      new User({
        login,
        password: password1,
      }).save((err) => {
        if (err) {
          error('User exist or not corret input params', 'LOGIN');
        } else {
          success(true);
        }
      });
    } else {
      error('Is not correct password', 'PASSWORD');
    }
  },
};
