import express, { Router } from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';

import { connect } from './database';
import App from '../client/App.jsx';
import Html from '../client/Html.jsx';
import api from './api';

const PORT = 5000;
const app = express();
const httpServer = http.Server(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.static('dist/client'));

app.use('/api', api.auth);

app.get('/', (req, res) => {
  const clietnApp = App({ cookies: req.cookies });
  const content = renderToString(clietnApp.content);

  const response = Html({
    title: 'FindPart',
    content,
    defStore: clietnApp.store ? clietnApp.store.getState() : null,
  });

  res.send(response);
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);

  connect();
});
