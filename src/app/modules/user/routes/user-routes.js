import UserController from '../controller/user-controller';
import authMiddleware  from '../../../middlewares/auth-middleware';
import CustomRouter  from '../../../../lib/custom-router';
import multer from 'multer';
import multerConfig  from '../../../../config/multer-config';

const routes = new CustomRouter();
const upload  = multer(multerConfig);

const LogRoute = (req, res, next)=>{
    console.log('CHAMANDO ROTA USER');
    next();
};

routes.post('/users', UserController.store,LogRoute);
routes.post('/users/login', UserController.login);
routes.get('/users/profile' ,UserController.profile,authMiddleware);

export default routes.getRoutes();