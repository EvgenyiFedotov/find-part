import { Router } from 'express';
import { Company } from '../database';
import methods from '../methods';

const api = new Router();

api.post('/', (req, res) => {
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

api.put('/', (req, res) => {
  const { _id } = req.body;

  methods.companyFindAndUpdate(req, res)(_id, req.body);
});

api.delete('/', (req, res) => {
  const { _id } = req.query;

  methods.companyFindAndUpdate(req, res)(_id, {
    isDelete: true,
  });
});

export default api;
