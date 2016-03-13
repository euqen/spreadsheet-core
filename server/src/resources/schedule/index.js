import express from 'express';
import responsify from './../../utils/responsify';
import scheduleController from './schedule.controller';

const controller = responsify(scheduleController);
const router = express.Router();

router.get('/', controller.list);
router.post('/save', controller.save);

export default router;