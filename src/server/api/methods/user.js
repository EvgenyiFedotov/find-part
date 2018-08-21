import { User } from '../../database/users';

function isValid(login, password) {
  if (!login) {
    return { message: 'Login is not valid', status: 'LOGIN' };
  }

  if (!password || password.length < 6) {
    return { message: 'Password is not valid', status: 'PASSWORD' };
  }

  return {};
}

export default {
  signUp: (params, success, error) => {
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
  },
  signIn: (params) => {
    console.log('signIn', params);
  },
};
