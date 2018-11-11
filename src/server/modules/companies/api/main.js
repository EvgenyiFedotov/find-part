import { Router } from 'express';
import methods from '../methods';
import companyApi from './company';

const api = new Router();

api.get('/', (req, res) => {
  const { currentSession } = req;

  if (currentSession) {
    const { userId } = currentSession;

    methods.companiesFind(req, res)({
      isDelete: false,
      userId,
    });
  } else {
    res.sendStatus(404);
  }
});

api.use('/company', companyApi);

export default api;
