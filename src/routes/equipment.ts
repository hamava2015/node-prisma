import express from 'express';
import auth from '../middleware/auth';

import { addEquipment, getEquipments } from '../controllers/equipment';


const router = express.Router();

router.get('/equipments', auth, getEquipments);
router.post('/equipment', auth, addEquipment);


export default router;