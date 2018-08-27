import Io from 'socket.io';
import namespace from './namespace';

export default function (httpServer, callbacks) {
  const server = new Io(httpServer, {
    serveClient: false,
    wsEngine: 'ws',
  });

  return namespace(server, callbacks);
}
