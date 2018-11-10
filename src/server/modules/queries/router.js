import { Router } from 'express';
import api from './api';
import sideServer from '../../../client/modules/queries/sides/server';

const router = new Router();

router.get('/queries', (req, res) => {
  res.send(sideServer({
    location: req.originalUrl,
  }));
});

router.use('/api/queries', api);

export default router;
