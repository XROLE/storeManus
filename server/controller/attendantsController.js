import bcrypt from 'bcrypt';
import generatePassword from 'password-generator';
import { addAttendants } from '../model/attendants';
import { isEmailInUse } from '../model/attendants';
import { getAttendants } from '../model/attendants';
import { getOneAttendantById } from '../model/attendants';

class Attendants {
    static addAttendants(req, res){
        const [ firstName, lastName, email] =[req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim().toLowerCase()] ;
        const password = generatePassword(20, false);                            // Auto generate password
        isEmailInUse(email).then(res => res)
            .then((response) => {
                if(response.rows.length > 0){                    
                    return res.status(409).json({
                        Success: false,
                        Message: 'Email has already been registered'
                    });
                }                
                bcrypt.hash(password, 10).then((hashpassword) => {                 // has generated password            
                    addAttendants(firstName, lastName, email, hashpassword)
                        .then((addedAttendant) => {
                            return res.status(200).json({
                                Success: true,
                                Message: 'You have successfully added an attendant',
                                firstName: addedAttendant.firstname,
                                lastName: addedAttendant.lastname,
                                password
                            });
                        });            
                });
            });
       
    }
    static getAllAttendants(req, res){  // GET ONE PRODUCT
        getAttendants()
            .then((attendants) => {
                if(attendants.length === 0){
                    res.status(200).json({
                        Success: true,
                        Message: 'No attendant has been registered yet'
                    });
                }
                return res.status(200).json({
                    Success: true,
                    Message: 'Products serverd',                 
                    attendants
                });
            });
    }
    static getOneAttendants(req, res){  // GET ONE PRODUCT
        const id = [req.params.id];
        getOneAttendantById(id)
            .then((attendants) => {
                if(attendants.length === 0){
                    res.status(200).json({
                        Success: true,
                        Message: 'No attendant with such ID exist'
                    });
                }
                return res.status(200).json({
                    Success: true,
                    Message: 'Products serverd',                 
                    attendants
                });
            });
    }
    static signInAttendants(req, res){
        const Token = req.token;       
        return res.status(200).json({
            Success: true,
            Message: 'You are signed in successfuly',
            Token
        });
    }
}

export default Attendants;






