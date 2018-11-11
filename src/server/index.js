import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import Loadable from 'react-loadable';

import databaseConnect from './databaseConnect';
import modules from './modules';

const PORT = 5000;
const app = express();
const httpServer = http.Server(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.static('dist/client'));
app.get('/favicon.ico', (req, res) => res.sendStatus(404));
app.use(modules.auth.api);
app.use(modules.dashboard.router);
app.use(modules.companies.router);
app.use(modules.partners.api);
app.use(modules.queries.router);

Loadable.preloadAll().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);

    databaseConnect();
  });
});
