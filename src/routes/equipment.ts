import express from 'express';
import auth from '../middleware/auth';

import { add, get, checkout } from '../controllers/equipmentController';


const router = express.Router();

router.get('/list', auth, get);
router.post('/add', auth, add);
router.post('/checkout', auth, checkout);

export default router;