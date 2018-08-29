import methods from '../methods';
import SuperSocket from '../../../common/SuperSocket/server';

export default {
  api: SuperSocket.apiHandler.bind(SuperSocket, methods),
  check: (common) => {
    console.log('@check', common);

    return {
      res: true,
    };
  },
};
