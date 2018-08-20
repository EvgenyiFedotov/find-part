import express from 'express';
import http from 'http';
import { main } from './http';
import socket from './socket';
import { connect } from './database';

import handlers from './api/sockets/handlers';

const PORT = 3000;
const app = express();
const httpServer = http.Server(app);

app.use(express.static('dist/client'));
app.get('/', main);

socket(httpServer, {
  ...handlers,
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);

  connect();
});
