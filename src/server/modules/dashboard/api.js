import { Router } from 'express';

import dashboardServer from '../../../client/modules/dashboard/server.jsx';

const dashboard = new Router();

dashboard.get('/dashboard', (req, res) => {
  res.send(dashboardServer(req.originalUrl));
});

dashboard.use(['/dashboard*', '/api/dashboard*'], (req, res, next) => {
  const { session } = req.cookies;

  if (!session) {
    res.sendStatus(404);
  } else {
    next();
  }
});

export default dashboard;
