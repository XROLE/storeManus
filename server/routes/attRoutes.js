import { Router } from 'express';
import checkToken from '../middlewares/auth/checkToken';
import Attendants from '../controller/attendantsController';         // ATTENDANTS CONTROLLER
import AttendantToken from '../middlewares/auth/attendantJWT';      // HANDLES ATTENDANTS TOKEN
import ValidateAttendant from '../middlewares/validateAttendants';  // HANDLES ATTENDANTS VALIDATION

const attRoutes = Router();

//ATTENDANTS
attRoutes.get('/', checkToken, Attendants.getAllAttendants);  // register attendants
attRoutes.get('/:id', checkToken, Attendants.getOneAttendants);  // register attendants
attRoutes.post('/auth/signin',  ValidateAttendant.validateSignIn, AttendantToken.createToken, Attendants.signInAttendants);
attRoutes.post('/auth/register', checkToken,ValidateAttendant.validateSignUp, Attendants.addAttendants);  // register attendants

export default attRoutes;
