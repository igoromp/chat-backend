import 'dotenv/config';
import express from 'express';
import routes from './routes';
import {resolve} from 'path';

import './database';
import 'express-async-errors';

class App {
    constructor(){
      console.log("INIT CLASS APP...");
      this.server = express();
      
      this.initialize();
    }

    initialize() {
      this.loadMiddlewares();
      this.loadRoutes();
      this.exceptionHandler();
    }

    loadMiddlewares() {
      this.server.use(express.json());
      this.server.use(express.urlencoded({ extended:true }))
      this.server.use((req, res, next)=>{
          res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
      })
      this.server.use('/files',express.static(resolve(__dirname,'..', 'tmp', 'uploads')));
    }

    loadRoutes() {
      this.server.use(routes)
    }

    exceptionHandler() {
      this.server.use(async(err, req, res, next) => {
         return res.status(500).json({
          message: 'Internal Server Error',
          status: 500,
        }); 

      });
    }
}

export default new App().server;