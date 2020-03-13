import 'dotenv/config';
import express from 'express';
import routes from './routes';
import {resolve} from 'path';

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
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended:true }))
        this.server.use('/files',express.static(resolve(__dirname,'..', 'tmp', 'uploads')));
    }

    loadRoutes() {
        this.server.use(routes)
    }

}

export default new App().server;