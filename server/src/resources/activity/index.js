import express from 'express';
import responsify from './../../utils/responsify';
import scheduleController from './activity.controller';

const controller = responsify(scheduleController);
const router = express.Router();

router.get('/students', controller.getStudents);
router.get('/schedules', controller.getSchedules);

export default router;