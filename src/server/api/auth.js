import { Router } from 'express';

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

  res.send(true);
});

export default auth;
