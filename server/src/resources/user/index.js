import express from 'express';
import controller from './user.controller';
const router = express.Router();

router.post('/create', controller.create);
router.get('/', controller.list);
router.put('/:id/remove', controller.remove);

export default router;