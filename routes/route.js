import { Router } from 'express';
import validatProduct from '../middlewares/validateProduct';
import productController from '../controller/productController';
import validateSales from '../middlewares/validateSales';
import salesController from '../controller/salesController'; 
import attendants from '../controller/attendantsController';         // ATTENDANTS CONTROLLER
import attendantToken from '../middlewares/auth/attendantJWT';      // HANDLES ATTENDANTS TOKEN
import adminSignIn from '../controller/admin';
import validateAttendant from '../middlewares/validateAttendants';  // HANDLES ATTENDANTS VALIDATION
import AdminToken from '../middlewares/auth/adminJWT';
import checkToken from '../middlewares/auth/checkToken';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to StoreManus API Home page. Go to /api/v1/users/products to view all products'));
router.post('/api/v1/attendants',  checkToken, validateAttendant.validateSignIn, attendants.addAttendants);      // add attendants
router.post('/api/v1/attendants/auth/signin',  validateAttendant.validateSignIn, attendantToken.createToken, attendants.signInAttendants);
router.post('/api/v1/admin/auth/signin', AdminToken.createToken, adminSignIn);
router.post('/api/v1/products', checkToken, validatProduct.postProduct, productController.postProduct);                      //Post Products
router.get('/api/v1/products', checkToken, productController.getProducts);                                       //Get all Products
router.get('/api/v1/products/:id', checkToken, validatProduct.getOneProduct, productController.getOneProduct);    // Get single product
router.put('/api/v1/products/:id',checkToken, validatProduct.editProduct, productController.putProducts );       // Edit product
router.delete('/api/v1/products/:id',checkToken,  validatProduct.deleteProduct, productController.deleteProduct); //Delete product
router.post('/api/v1/sales', checkToken, validateSales.postSales, salesController.postSales);                     // Post Sales
router.get('/api/v1/sales', checkToken, salesController.getSales);                                                // Get all Sales
router.get('/api/v1/sales/:id', checkToken, validateSales.getOneSales, salesController.getOneSale);               // Get one sales
export default router;

