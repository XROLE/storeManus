import { Router } from 'express';
import ValidateSales from '../middlewares/validateSales';
import SalesController from '../controller/salesController'; 
import adminSignIn from '../controller/admin';
import AdminToken from '../middlewares/auth/adminJWT';
import checkToken from '../middlewares/auth/checkToken';

const router = Router();
//HOME 
router.get('/', (req, res) => res.send('Welcome to StoreManus API Home page. Go to /api/v1/users/products to view all products'));

//ADMIN
router.post('/api/v1/admin/auth/signin', AdminToken.createToken, adminSignIn);


//SALES
router.post('/api/v1/sales', checkToken, ValidateSales.postSales, SalesController.postSales);                     // Post Sales
router.get('/api/v1/sales', checkToken, SalesController.getSales);                                                // Get all Sales
router.get('/api/v1/sales/:id', checkToken, ValidateSales.getOneSales, SalesController.getOneSale);               // Get one sales
export default router;