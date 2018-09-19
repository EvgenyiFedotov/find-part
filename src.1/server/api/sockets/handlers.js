import methods from '../methods';
import SuperSocket from '../../../common/SuperSocket/server';

export default {
  connection: (superSocket) => {
    console.log('@connection', superSocket.cookie);
  },
  api: SuperSocket.apiHandler.bind(SuperSocket, methods),
};
