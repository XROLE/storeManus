import { Router } from 'express';
import storeDB from '../model/db';
import validatProduct from '../middlewares/validateProduct';
import productController from '../controller/productController';
import validateSales from '../middlewares/validateSales';
import salesController from '../controller/salesController';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to StoreManus API Home page. Go to /api/v1/users/products to view all products'));

router.get('/api/v1/products', productController.getProducts);                                        //Get all Products
router.get('/api/v1/products/:id', validatProduct.getOneProduct, productController.getOneProduct);    // Get single product
router.post('/api/v1/products', validatProduct.postProduct, productController.postProduct);           //Post Products
router.put('/api/v1/products/:id', validatProduct.editProduct, productController.putProducts );       // Edit product
router.delete('/api/v1/products/:id', validatProduct.deleteProduct, productController.deleteProduct); //Delete product
router.get('/api/v1/sales', salesController.getSales);                                                // Get all Sales
router.get('/api/v1/sales/:id', validateSales.getOneSales, salesController.getOneSale);               // Get one sales
router.post('/api/v1/sales', validateSales.postSales, salesController.postSales);                     // Post Sales

export default router;
