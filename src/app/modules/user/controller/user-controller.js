import * as Yup from 'yup';
import User from '../model/user';

class UserController {

    async store(req, res) {
        let result = null;
        const { body } = req;
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        });

        if (!(await schema.isValid(body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }
        console.log(body)
        result = await User.create(body);

        return res.json(result);
    }
}

export default new UserController();