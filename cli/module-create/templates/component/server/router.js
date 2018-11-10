import { Router } from 'express';
import api from './api';

const router = new Router();

router.use('/api/NAME_MODULE', api);

export default router;
