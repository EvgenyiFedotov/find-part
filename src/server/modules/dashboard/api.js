import { Router } from 'express';

import dashboardServer from '../../../client/modules/dashboard/server';

const dashboard = new Router();

dashboard.get('/dashboard', (req, res) => {
  res.send(dashboardServer({
    location: req.originalUrl,
    props: {
      getCookies: () => req.cookies,
    },
  }));
});

export default dashboard;
