import jwt from 'jsonwebtoken';
import { getOneAttendant } from '../../model/attendants';

class AttendantToken{
    static createToken(req, res, next){
        const mail = req.body.email;
        const pass = req.body.password;
        const email = [mail];
        getOneAttendant(email)
            .then((result) => {
                const { id, firstname, lastname, email, password, phoneno, gender, profilepics  } = result; 
                
                // CHECK PASSWORD MATCH
                if(pass !== password){                
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
               
    }    
}

export default AttendantToken;





// class Token{

//     static  createAttToken(req, res, next) {
//         const { firstName, lastName, email, phoneNumber } = req.body;  // Assigning student data to request body;
//         const payload = { firstName, lastName, email, phoneNumber };
//         const secret = process.env.jwt_secret;
//         const token = jwt.sign(payload, secret);  // generating jwt token
    
//         if(!token){
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Authentication failed please check request'
//             });
//         }
//         req.token = token;
//         return next();   
//     }
// }