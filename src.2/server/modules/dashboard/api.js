import { Router } from 'express';

const dashboard = new Router();

dashboard.use(['/dashboard*', '/api/dashboard*'], (req, res, next) => {
  const { session } = req.cookies;

  if (!session) {
    res.sendStatus(404);
  } else {
    next();
  }
});

export default dashboard;
