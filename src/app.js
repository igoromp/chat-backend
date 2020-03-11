import 'dotenv/config';
import express from 'express';
import routes from './routes';

import './database';

class App {
    constructor(){
        this.server = express();
        this.initialize();
    }

    initialize() {
        this.loadMiddlewares();
        this.loadRoutes();
    }

    loadMiddlewares() {
        this.server.use(express.json())
    }

    loadRoutes() {
        this.server.use(routes)
    }

}

export default new App().server;