import { Router } from 'express';
import api from './api';
import sideServer from '../../../client/modules/NAME_MODULE/sides/server';

const router = new Router();

router.get('/NAME_MODULE', (req, res) => {
  res.send(sideServer({
    location: req.originalUrl,
  }));
});

router.use('/api/NAME_MODULE', api);

export default router;
