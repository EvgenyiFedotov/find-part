import { Router } from 'express';

import { Company } from './database';

const companies = new Router();
export const companiesApi = new Router();

companies.use('/api/companies', companiesApi);

companiesApi.get('/', (req, res) => {
  const meta = [
    // {
    //   cid: uuid(),
    //   name: 'Название моей компании',
    //   isPublic: false,
    //   partners: [],
    // }, {
    //   cid: uuid(),
    //   name: 'Моя новая компания',
    //   isPublic: true,
    //   partners: [],
    // }, {
    //   cid: uuid(),
    //   name: 'Моя компания с парнтерами',
    //   isPublic: true,
    //   partners: [1, 2, 3],
    // },
  ];
  const { userId } = req.currentSession;

  Company.find({
    isDelete: false,
    userId,
  }).sort({ _id: -1 }).exec((err, result) => {
    if (!err) {
      res.send({
        success: true,
        items: [
          ...result,
          ...meta,
        ],
      });
    } else {
      res.send({
        success: false,
      });
    }
  });
});

export const companyApi = new Router();

const companyFindAndUpdate = (req, res) => (_id, params) => {
  if (_id) {
    Company.findByIdAndUpdate(_id, params, (err) => {
      if (!err) {
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
  } else {
    res.send({
      success: false,
    });
  }
};

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
