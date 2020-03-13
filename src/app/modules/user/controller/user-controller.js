import * as Yup from 'yup';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import authConfig from '../../../../config/auth-config';
import Files from '../../files/model/files';

class UserController {

    async store(req, res) {
        const { body } = req;
        const { originalname: filename, filename: filepath } = req.file;
        const newUser = JSON.parse(body.user);

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(newUser))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }
        const { email } = newUser;
        const find = await User.findOne({ where : { email } } );

        if( find ) {
            return res.status(401).json({ error: 'User already exists.' });
        }

        let file ;
        if (filename && filepath ) {
            file = await Files.create({name: filename, path: filepath});
        }
        const {id:fileId} = file.dataValues;
        const {name } = await User.create({avatar_id:fileId, ...newUser});

        const result = {
            email, name, avatar:file.url
        }

        return res.json(result);
    }

    async profile(req, res) {
        //TODO PAROU AQUI
        const user = await User.findByPk(req.userId);
        const { email , name , avatar_id} = user;
        return res.json({
            email,
            name, avatar_id
        });
    }    

    async login(req, res) {

        const { body }  =  req;
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })

        if(!(await schema.isValid(body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { email , password } = body;
        const user = await User.findOne({ where : { email } });
        
        if(!user) {
            return res.status(404).json({ error : 'User not found'})
        }

        if(!( await user.checkPassword( password ) )){
            return res.status(401).json( { error : 'Password does not  match.'})
        }

        const { id , name } = user;
       
        return res.json({
            email, 
            name,
            token: jwt.sign({id, email}, authConfig.secret, { expiresIn:authConfig.expiratesIn})
        })
    }
}

export default new UserController();