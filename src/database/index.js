import Sequelize from 'sequelize';
import dataBaseConfig  from '../config/database-config';
import User from '../app/modules/user/model/user';
import Files from '../app/modules/files/model/files';
const models = [
    User,
    Files
]

class DataBase {
    constructor() {
        this.init();
    }

    init() {
        this.connection  = new Sequelize(dataBaseConfig);
        models.map(model=>model.init(this.connection))
              .map(model=> model.associate && model.associate(this.connection.models))  
    }
}

export default new DataBase();