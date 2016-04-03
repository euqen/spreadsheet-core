import express from 'express';
import responsify from './../../utils/responsify';
import * as groupController from './group.controller';

const controller = responsify(groupController);
const router = express.Router();

router.post('/create', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/:id/update', controller.update);
router.put('/:id/remove', controller.remove);

export default router;