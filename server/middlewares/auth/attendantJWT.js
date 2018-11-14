import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getOneAttendant } from '../../model/attendants';

class AttendantToken{
    static createToken(req, res, next){
        const mail = req.body.email;
        const plainPassword = req.body.password;
        const email = [mail];
        getOneAttendant(email)
            .then((result) => {                
                if(!result.length){
                    return res.status(404).json({
                        Success:false,
                        Message: 'No attendant with such details'
                    });
                }
                const { id, firstname, lastname, email, password, phoneno, gender, profilepics  } = result[0];                 
              
                // CHECK PASSWORD MATCH
                bcrypt.compare(plainPassword, password).then( matched => {
                    if(matched === false){                
                        return res.status(400).json({
                            Success: false,
                            Message: 'Password do not match. Please enter the correct password'
                        });                    
                    }
                    // CREATE TOKEN
                    const payload = { id, firstname, lastname, email, password, phoneno, gender, profilepics  };
                    const secret = process.env.jwt_secret;
                    const token = jwt.sign(payload, secret);  // generating jwt token
                    req.token = token;
                    next();                    
                });
                    
            });       
               
    }    
        
}

export default AttendantToken;




