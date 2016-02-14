import express from 'express';
import controller from './auth.controller';

const router = express.Router();

router.post('/log-in', controller.logIn);

export default router;