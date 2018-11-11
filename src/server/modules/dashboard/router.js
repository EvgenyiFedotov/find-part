import { Router } from 'express';
import api from './api';
import loader from './loader';

const router = new Router();

router.get('/dashboard', (req, res) => {
  res.send(loader({
    location: req.originalUrl,
    props: {
      getCookies: () => req.cookies,
    },
  }));
});

router.use('/api/dashboard', api);

export default router;
