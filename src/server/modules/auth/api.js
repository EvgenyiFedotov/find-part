import { Router } from 'express';

import { User } from './database';

const auth = new Router();

auth.get('/signin', (req, res) => {
  console.log(req.query);

  res.send({
    test: 'value from server',
    test2: 'asd',
  });
});

auth.post('/signup', (req, res) => {
  console.log(req.body);

  const { login, password, passwordRepeat } = req.body;

  if (password === passwordRepeat && password.length >= 6) {
    new User({ login, password }).save((err) => {
      if (err) {
        res.send({
          success: false,
          errors: {
            login: 'Пользователь с введенным логином сущеуствует',
          },
        });
      } else {
        res.send({
          success: true,
        });
      }
    });
  } else {
    res.send({
      success: false,
      errors: {
        password: 'Введите корректный пароль (более 6 символов)',
      },
    });
  }
});

export default auth;
