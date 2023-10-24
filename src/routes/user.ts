import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.post('/signup', controller.signupUser);
router.post('/login', controller.loginUser);
router.post('/logout', controller.invalidateToken);

export = router;
