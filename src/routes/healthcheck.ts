import express from 'express';
import controller from '../controllers/healthcheck';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);

export default router;
