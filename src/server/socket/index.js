import Io from 'socket.io';
import namespace from './namespace';

export default function (httpServer, callbacks) {
  const server = new Io(httpServer, {
    serveClient: false,
    wsEngine: 'ws',
  });

  // server.use((socket, next) => {
  //   socket.request.headers.cookie
  //   console.log(socket.request.headers.cookie.vc);
  //   if (socket.request.headers.cookie) return next();
  //   next(new Error('Authentication error'));
  // });

  return namespace(server, callbacks);
}
