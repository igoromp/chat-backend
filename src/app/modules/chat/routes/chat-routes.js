import CustomRouter  from '../../../../lib/custom-router';
import chatController from '../controller/chat-controller';

const routes = new CustomRouter();

routes.get('/chat', chatController.index);

export default routes.getRoutes();