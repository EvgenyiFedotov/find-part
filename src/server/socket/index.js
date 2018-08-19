import Io from 'socket.io';
import namespace from './namespace';
import handlers from './handlers';

export default function (httpServer) {
  const server = new Io(httpServer, {
    serveClient: false,
    wsEngine: 'ws',
  });

  namespace(server, handlers);
}
