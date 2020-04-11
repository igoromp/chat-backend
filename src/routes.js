import userRoutes from './app/modules/user/routes/user-routes';
import homeRoutes from './app/modules/home/routers/home-router';
import chatRoutes from './app/modules/chat/routes/chat-routes';

const routes = [
    homeRoutes,
    userRoutes,
    chatRoutes
];

export default routes;