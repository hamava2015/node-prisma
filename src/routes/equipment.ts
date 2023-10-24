import express from 'express';
import auth from '../middleware/auth';

import { add, get, checkout, ret } from '../controllers/equipmentController';


const router = express.Router();

router.get('/list', auth, get);
router.post('/add', auth, add);
router.post('/checkout', auth, checkout);
router.post('/return', auth, ret);

export default router;