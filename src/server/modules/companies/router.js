import { Router } from 'express';
import api from './api';

const router = new Router();

router.use('/api/companies', api.main);

export default router;
