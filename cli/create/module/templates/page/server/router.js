import { Router } from 'express';
import api from './api';
import loader from './loader';

const router = new Router();

router.get('/NAME_MODULE', (req, res) => {
  res.send(loader({
    location: req.originalUrl,
  }));
});

router.use('/api/NAME_MODULE', api);

export default router;
