import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import generatePassword from 'password-generator';
import { addAttendants } from '../model/attendants';
import { isEmailInUse } from '../model/attendants';
import { getAttendants } from '../model/attendants';
import { getOneAttendantById } from '../model/attendants';
import { updateAttendant } from '../model/attendants';

// CONFIGURE CLOUDINARY
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.API_key, 
    api_secret: process.env.API_Secrete
});

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
                bcrypt.hash(password, 10).then((hashpassword) => {                 // hash generated password            
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
            })
            .catch(e => console.log(e));       
    }
    static getAllAttendants(req, res){  // GET ALL ATTENDANTS
        getAttendants()
            .then((attendants) => {
                if(attendants.length === 0){
                    return  res.status(200).json({
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
    static getOneAttendants(req, res){  // GET ONE ATTENDANT
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
    static editOneAttendant(req, res){  // EDIT ONE ATTENDANT
        const {firstName, lastName, email, password, phoneno, gender, profilepics} = req.body;
        const id = req.params.id;        
        cloudinary.v2.uploader.upload(profilepics, (error, result) => { // Upload image to cloudinary
            if(error){
                console.log(error);                
                return res.status(500).json({
                    Success: false,
                    Message: 'internal server error occured while uploading your image, please make sure you have internet connection and try again'
                });
            }
            const cloudinaryImageUrl = result.secure_url;
            bcrypt.hash(password, 10).then((hashpassword) => {
                updateAttendant(firstName, lastName, email, hashpassword, phoneno, gender, cloudinaryImageUrl, id)
                    .then((attendant) => {
                        if(attendant.length === 0){
                            res.status(200).json({
                                Success: true,
                                Message: 'No attendant with such ID exist'
                            });
                        }                     
                        return res.status(200).json({
                            Success: true,
                            Message: 'Profile updated successfully',                 
                            profile: attendant
                        });
                    });
            });
        });
       
    }
    static signInAttendants(req, res){   // SIGN IN AN ATTENDANT
        const Token = req.token;       
        return res.status(200).json({
            Success: true,
            User: 'attendant',
            Message: 'You are signed in successfuly',
            Token
        });
    }
}

export default Attendants;






