import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import React from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router-dom';

import databaseConnect from './databaseConnect';
import modules from './modules';

import auth from '../client/modules/auth/server.jsx';

const PORT = 5000;
const app = express();
const httpServer = http.Server(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.static('dist/client'));
app.get('/favicon.ico', (req, res) => res.sendStatus(404));
app.use(modules.auth.api);
app.use(modules.dashboard.api);

app.get('/', (req, res) => {
  res.send(auth);
});

Loadable.preloadAll().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);

    databaseConnect();
  });
});
