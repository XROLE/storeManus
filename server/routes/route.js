import { Router } from 'express';
import adminSignIn from '../controller/admin';
import AdminToken from '../middlewares/auth/adminJWT';


const router = Router();
//HOME 
router.get('/', (req, res) => res.send('Welcome to StoreManus API Home page. Go to /api/v1/users/products to view all products'));

//ADMIN
router.post('/api/v1/admin/auth/signin', AdminToken.createToken, adminSignIn);

export default router;


