import { Router } from 'express';

import { Company } from './database';
import { companiesFind, companyFindAndUpdate } from './common';

const companies = new Router();
export const companiesApi = new Router();

companies.use('/api/companies', companiesApi);

companiesApi.get('/', (req, res) => {
  const { currentSession } = req;

  if (currentSession) {
    const { userId } = currentSession;

    companiesFind(req, res)({
      isDelete: false,
      userId,
    });
  } else {
    res.sendStatus(404);
  }
});

export const companyApi = new Router();

companies.use('/api/company', companyApi);

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

  companyFindAndUpdate(req, res)(_id, req.body);
});

companyApi.delete('/', (req, res) => {
  const { _id } = req.query;

  companyFindAndUpdate(req, res)(_id, {
    isDelete: true,
  });
});

export default companies;
