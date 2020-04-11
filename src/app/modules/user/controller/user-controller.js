import * as Yup from 'yup';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import authConfig from '../../../../config/auth-config';
import Files from '../../files/model/files';

class UserController {

    async store(req, res) {
        let { body } = req;
        const {password ,confirmPassword} = body;
        
        if ( password !== confirmPassword ){
            return res.status(400).json({message:'Password and confirm password not equals.'});
        }
        delete body.confirmPassword;

        const newUser = body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(newUser))) {
            return res.status(400).json({ message: 'Validation fails.' });
        }
        const { email } = newUser;
        const find = await User.findOne({ where : { email } } );

        if( find ) {
            return res.status(401).json({ message: 'User already exists.' });
        }

        const { name } = await User.create({...newUser});
        
        const result = {
            email, name
        }

        return res.status(201).json(result);
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
            return res.status(400).json({ message: 'Validation fails.' });
        }

        const { email , password } = body;
        const user = await User.findOne({ where : { email } });
        
        if(!user) {
            return res.status(404).json({ message : 'User not found'})
        }

        if(!( await user.checkPassword( password ) )){
            return res.status(401).json( { message : 'Password does not  match.'})
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