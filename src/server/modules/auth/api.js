import { Router } from 'express';

import { User, Session } from './database';
import authServer from '../../../client/modules/auth/server.jsx';

const auth = new Router();

auth.get(['/', '/auth*'], (req, res) => {
  res.send(authServer({
    location: req.originalUrl,
    props: {
      getCookies: () => req.cookies,
    },
  }));
});

auth.get('/api/auth/signin', (req, res) => {
  const { login, password } = req.query;

  User.findOne({ login, password }, (error, user) => {
    if (user) {
      const session = new Session({
        userId: user._id,
        userAgent: req.headers['user-agent'],
      });

      session.save(() => {
        res.cookie('session', session._id);

        res.send({
          success: true,
        });
      });
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

auth.post('/api/auth/signup', (req, res) => {
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

auth.use('/*', (req, res, next) => {
  const { session } = req.cookies;

  if (!session) {
    res.redirect('/auth');
  } else {
    next();
  }
});

auth.get('/api/auth/signout', (req, res) => {
  res.clearCookie('session');

  res.send({
    success: true,
  });
});

export default auth;
