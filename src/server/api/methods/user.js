import { User } from '../../database/users';

export default {
  signup: (params, success, error) => {
    console.log(params);

    error({
      r: 1,
      b: 2,
      z: 999,
    });

    // let { login, password1, password2 } = params;

    // if (password1 === password2) {

    // }
  },
};
