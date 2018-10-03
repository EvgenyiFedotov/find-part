import { Router } from 'express';

import { User } from './database';

const auth = new Router();

auth.get('/signin', (req, res) => {
  const { login, password } = req.query;

  User.findOne({ login, password }, (error, user) => {
    if (user) {
      res.send({ success: true });
    } else {
      res.send({
        success: false,
        errors: {
          login: 'Логин или пароль введены некорректно',
          password: 'Логин или пароль введены некорректно',
        },
      });
    }
  });
});

auth.post('/signup', (req, res) => {
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
