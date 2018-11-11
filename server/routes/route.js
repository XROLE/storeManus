import { Router } from 'express';
import ValidatProduct from '../middlewares/validateProduct';
import ProductController from '../controller/productController';
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

//PRODUCTS
router.post('/api/v1/products', checkToken, ValidatProduct.postProduct, ProductController.postProduct);                      //Post Products
router.get('/api/v1/products', checkToken, ProductController.getProducts);                                       //Get all Products
router.get('/api/v1/products/available', ProductController.getAvailableProducts);                                // Get available product                                 //Get all Products
router.get('/api/v1/product/:id', checkToken, ValidatProduct.getOneProduct, ProductController.getOneProduct);    // Get single product
router.put('/api/v1/products/:id',checkToken, ValidatProduct.editProduct, ProductController.putProducts );       // Edit product
router.delete('/api/v1/products/:id',checkToken,  ValidatProduct.deleteProduct, ProductController.deleteProduct); //Delete product

//SALES
router.post('/api/v1/sales', checkToken, ValidateSales.postSales, SalesController.postSales);                     // Post Sales
router.get('/api/v1/sales', checkToken, SalesController.getSales);                                                // Get all Sales
router.get('/api/v1/sales/:id', checkToken, ValidateSales.getOneSales, SalesController.getOneSale);               // Get one sales
export default router;