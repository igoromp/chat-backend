import { Router } from 'express';
import UserController from '../controller/user-controller';
import authMiddleware  from '../../../middlewares/auth-middleware';

import multer from 'multer';
import multerConfig  from '../../../../config/multer-config';

const routes = new Router();
const upload  = multer(multerConfig);

routes.post('/users',upload.single('file'), UserController.store);
routes.post('/users/login', UserController.login);
routes.get('/users/profile',authMiddleware ,UserController.profile);

export default routes;