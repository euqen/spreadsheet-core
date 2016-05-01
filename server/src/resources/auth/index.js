import express from 'express';
import authController from './auth.controller';
import responsify from './../../utils/responsify';

const router = express.Router();
const controller = responsify(authController);

router.post('/log-in', controller.logIn);
router.put('/log-out', controller.logOut);

export default router;