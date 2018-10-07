import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import databaseConnect from './databaseConnect';
import App from '../client/App.jsx';
import Html from '../client/Html.jsx';
import modules, { cookiesByUrl } from './modules';

const PORT = 5000;
const app = express();
const httpServer = http.Server(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.static('dist/client'));
app.use(cookiesByUrl);
app.use(modules.auth.api);
app.use(modules.dashboard.api);

app.get('*', (req, res) => {
  const context = {};

  const response = Html({
    title: 'FindPart',
    content: renderToString(
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App
          cookiesByUrl={req.cookiesByUrl}
        />
      </StaticRouter>,
    ),
  });

  res.send(response);
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);

  databaseConnect();
});
