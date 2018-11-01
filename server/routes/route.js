import { Router } from 'express';
import ValidatProduct from '../middlewares/validateProduct';
import ProductController from '../controller/productController';
import ValidateSales from '../middlewares/validateSales';
import SalesController from '../controller/salesController'; 
import Attendants from '../controller/attendantsController';         // ATTENDANTS CONTROLLER
import AttendantToken from '../middlewares/auth/attendantJWT';      // HANDLES ATTENDANTS TOKEN
import adminSignIn from '../controller/admin';
import ValidateAttendant from '../middlewares/validateAttendants';  // HANDLES ATTENDANTS VALIDATION
import AdminToken from '../middlewares/auth/adminJWT';
import checkToken from '../middlewares/auth/checkToken';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to StoreManus API Home page. Go to /api/v1/users/products to view all products'));
router.post('/api/v1/attendants',  checkToken, ValidateAttendant.validateSignIn, Attendants.addAttendants);      // add attendants
router.post('/api/v1/attendants/auth/signin',  ValidateAttendant.validateSignIn, AttendantToken.createToken, Attendants.signInAttendants);
router.post('/api/v1/admin/auth/signin', AdminToken.createToken, adminSignIn);
router.post('/api/v1/products', checkToken, ValidatProduct.postProduct, ProductController.postProduct);                      //Post Products
router.get('/api/v1/products', checkToken, ProductController.getProducts);                                       //Get all Products
router.get('/api/v1/products/:id', checkToken, ValidatProduct.getOneProduct, ProductController.getOneProduct);    // Get single product
router.put('/api/v1/products/:id',checkToken, ValidatProduct.editProduct, ProductController.putProducts );       // Edit product
router.delete('/api/v1/products/:id',checkToken,  ValidatProduct.deleteProduct, ProductController.deleteProduct); //Delete product
router.post('/api/v1/sales', checkToken, ValidateSales.postSales, SalesController.postSales);                     // Post Sales
router.get('/api/v1/sales', checkToken, SalesController.getSales);                                                // Get all Sales
router.get('/api/v1/sales/:id', checkToken, ValidateSales.getOneSales, SalesController.getOneSale);               // Get one sales
export default router;

