import express from 'express';
import auth from '../middleware/auth';

import { addEquipment, getEquipments, checkoutEquipment } from '../controllers/equipment';


const router = express.Router();

router.get('/list', auth, getEquipments);
router.post('/add', auth, addEquipment);
router.post('/checkout', auth, checkoutEquipment);

export default router;