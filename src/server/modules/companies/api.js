import { Router } from 'express';
import { Company } from './database';
import methods from './methods';

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

const companyApi = new Router();

api.use('/company', companyApi);

companyApi.post('/', (req, res) => {
  const { userId } = req.currentSession;

  new Company({
    ...req.body,
    userId,
  }).save((err, result) => {
    if (!err) {
      const { _id } = result;

      res.send({
        success: true,
        _id,
      });
    } else {
      res.send({
        success: false,
      });
    }
  });
});

companyApi.put('/', (req, res) => {
  const { _id } = req.body;

  methods.companyFindAndUpdate(req, res)(_id, req.body);
});

companyApi.delete('/', (req, res) => {
  const { _id } = req.query;

  methods.companyFindAndUpdate(req, res)(_id, {
    isDelete: true,
  });
});

export default api;
