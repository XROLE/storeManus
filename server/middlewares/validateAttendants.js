// import { promisify} from 'es6-promisify';
import { isEmpty } from './validate';
import { isEmail } from './validate';


class ValidateAttendant{
    static validateSignIn(req, res, next){
        const [ password, email] =[req.body.password.trim(), req.body.email.trim().toLowerCase()] ;     
        if(isEmpty(email) || isEmpty(password) ){
            return res.status(400).json({
                Success: false,
                Message: 'No empty field is allowed. Please make sure you fill all fields'
            });
        }
        if(!isEmail(email)){
            return res.status(400).json({
                Success: false,
                Message: 'Invalid email format'
            });
        }
        return next();
    }
    static validateSignUp(req, res, next){
        const [ firstName, lastName, email] =[req.body.firstName.trim(), req.body.lastName.trim(),  req.body.email.trim().toLowerCase()] ;
        if(isEmpty(email) || isEmpty(firstName) || isEmpty(lastName) ){
            return res.status(400).json({
                Success: false,
                Message: 'No empty field is allowed. Please make sure you fill all fields'
            });
        }
        if(!isEmail(email)){
            return res.status(400).json({
                Success: false,
                Message: 'Invalid email format'
            });
        }   
           
        return next();
    }
    static validateProfileUpdate(req, res, next){
        const { confirmpassword, password, phoneno, gender, profilepics} = req.body;
        const [ firstName, lastName, email] = [req.body.firstName.trim(), req.body.lastName.trim(),  req.body.email.trim().toLowerCase()] ;
        if(confirmpassword !== password){
            return res.status(401).json({
                Success: false,
                Message: 'Password do not match'
            });
        }
        if(isEmpty(email) || isEmpty(firstName) || isEmpty(lastName) || isEmpty(password) || isEmpty(phoneno) || isEmpty(gender) || isEmpty(profilepics) ){
            return res.status(400).json({
                Success: false,
                Message: 'No empty field is allowed. Please make sure you fill all fields'
            });
        }
        if(!isEmail(email)){
            return res.status(400).json({
                Success: false,
                Message: 'Invalid email format'
            });
        }
        return next();
    }
}

export default ValidateAttendant;
