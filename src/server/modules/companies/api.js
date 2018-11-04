import { Router } from 'express';
import uuid from 'uuid/v4';

import { Company } from './database';

const companies = new Router();
export const companiesApi = new Router();

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

companies.use('/api/companies', companiesApi);

companiesApi.get('/fetch', (req, res) => {
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

companiesApi.post('/add', (req, res) => {
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

companiesApi.post('/edit', (req, res) => {
  const { _id } = req.body;

  companyFindAndUpdate(req, res)(_id, req.body);
});

companiesApi.delete('/', (req, res) => {
  const { _id } = req.query;

  companyFindAndUpdate(req, res)(_id, {
    isDelete: true,
  });
});

export default companies;
