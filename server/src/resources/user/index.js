import express from 'express';
import responsify from './../../utils/responsify';
import userController from './user.controller';

const controller = responsify(userController);
const router = express.Router();

router.post('/create', controller.create);
router.get('/', controller.list);
router.get('/current', controller.current);
router.put('/:id/remove', controller.remove);
router.put('/:id/locale', controller.changeLocale);
router.put('/:id/update', controller.updateUser);

export default router;