import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';
import { connect } from './database';
import Html from '../client/Html.jsx';
import App from '../client/App.jsx';

const PORT = 5000;
const app = express();
const httpServer = http.Server(app);

app.use(cookieParser());
app.use(express.static('dist/client'));

app.get('/', (req, res) => {
  const response = Html({
    title: 'FindPart',
    content: renderToString(App()),
    stateStore: {},
  });

  res.send(response);
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);

  connect();
});
