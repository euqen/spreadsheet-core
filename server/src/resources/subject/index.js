import express from 'express';
import responsify from './../../utils/responsify';
import * as subjectController from './subject.controller.js';

const controller = responsify(subjectController);
const router = express.Router();

router.post('/create', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/:id/update', controller.update);
router.put('/:id/remove', controller.remove);

export default router;