import { Router } from 'express';

import { Company } from './database';

const companies = new Router();
export const companiesApi = new Router();

companies.use('/api/companies', companiesApi);

companiesApi.get('/fetch', (req, res) => {
  const meta = [
    { name: 'Название моей компании', isPublic: false, partners: [] },
    { name: 'Моя новая компания', isPublic: true, partners: [] },
    { name: 'Моя компания с парнтерами', isPublic: true, partners: [1, 2, 3] },
  ];
  const { userId } = req.currentSession;

  Company.find({
    userId,
  }, (err, result) => {
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

  if (_id) {
    Company.findByIdAndUpdate(_id, req.body, (err) => {
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
});

export default companies;
