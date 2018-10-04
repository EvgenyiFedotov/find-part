import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';

import databaseConnect from './databaseConnect';
import App from '../client/App.jsx';
import Html from '../client/Html.jsx';
import modules from './modules';

const PORT = 5000;
const app = express();
const httpServer = http.Server(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.static('dist/client'));

app.use('/api', modules.auth.api);

app.get('/auth/asdasd/asdasd/asd', (req, res) => {
  console.log(req.cookies);

  const response = Html({
    title: 'FindPart',
    content: renderToString(<App location={req.url} />),
  });

  res.send(response);
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);

  databaseConnect();
});
