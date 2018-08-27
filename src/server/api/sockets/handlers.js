import methods from '../methods';
import SuperSocket from '../../../common/SuperSocket/server';

export default {
  api: SuperSocket.apiHandler.bind(SuperSocket, methods),
};
