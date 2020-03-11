import Sequelize from 'sequelize';
import dataBaseConfig  from '../config/database-config';
import User from '../app/modules/user/model/user';

const models = [
    User
]

class DataBase {
    constructor() {
        this.init();
    }

    init() {
        this.connection  = new Sequelize(dataBaseConfig);
        models.map(model=>model.init(this.connection));
    }
}

export default new DataBase();