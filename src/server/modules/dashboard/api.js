import { Router } from 'express';

import dashboardServer from '../../../client/modules/dashboard/server.jsx';

const dashboard = new Router();

dashboard.use(['/dashboard*', '/api/dashboard*'], (req, res, next) => {
  const { session } = req.cookies;

  if (!session) {
    res.sendStatus(404);
  } else {
    next();
  }
});

dashboard.get('/dashboard', (req, res) => {
  res.send(dashboardServer(req.originalUrl));
});

export default dashboard;
