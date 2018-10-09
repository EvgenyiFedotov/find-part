import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { SheetsRegistry } from 'react-jss/lib/jss';

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
app.get('/favicon.ico', (req, res) => res.sendStatus(404));
app.use(cookiesByUrl);
app.use(modules.auth.api);
app.use(modules.dashboard.api);

app.get('*', (req, res) => {
  const context = {};
  const modulesLoaded = [];
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const content = renderToString(
    <Loadable.Capture report={moduleName => modulesLoaded.push(moduleName)}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App
          cookiesByUrl={req.cookiesByUrl}
          sheetsRegistry={sheetsRegistry}
          sheetsManager={sheetsManager}
        />
      </StaticRouter>
    </Loadable.Capture>,
  );
  const css = sheetsRegistry.toString();

  const response = Html({
    title: 'FindPart',
    scriptsPreload: modulesLoaded,
    content,
    css,
  });

  res.send(response);
});

Loadable.preloadAll().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);

    databaseConnect();
  });
});
