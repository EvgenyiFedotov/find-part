import { Router } from 'express';
import companies from '../companies';

const api = new Router();

api.get('/find', (req, res) => {
  const { filter } = req.query;

  companies.methods.findByNameChunks(req, res)(
    filter instanceof Array && filter.length
      ? Object.keys(filter.reduce((result, key) => ({
        ...result,
        [key]: true,
      }), {}))
      : [],
  );
});

export default api;
