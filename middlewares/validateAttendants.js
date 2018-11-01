import { isEmpty } from './validate';
import { isEmail } from './validate';


class validateAttendant{
    static validateSignIn(req, res, next){
        const {email, password } = req.body;
        if(isEmpty(email) || isEmpty(password) ){
            return res.status(400).json({
                Success: false,
                Message: 'No empty field is allowed. Please make sure you fill all fields'
            });
        }
        if(!isEmail(email)){
            return res.status(400).json({
                Success: false,
                Message: 'invalid email format'
            });
        }
        return next();
    }
}

export default validateAttendant;