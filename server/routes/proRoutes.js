import { Router } from 'express';
import ValidatProduct from '../middlewares/validateProduct';
import ProductController from '../controller/productController';
import checkToken from '../middlewares/auth/checkToken';

const proRoutes = Router();

proRoutes.post('/', checkToken, ValidatProduct.postProduct, ProductController.postProduct);  //Post Products
proRoutes.get('/', checkToken, ProductController.getProducts);                               //Get all Products
proRoutes.get('/available',checkToken, ProductController.getAvailableProducts);              // Get available product                                 //Get all Products
proRoutes.get('/finished', checkToken, ProductController.getFinishedProducts);               // Get finished product                                 //Get all Products
proRoutes.get('/cat/:category', checkToken, ProductController.getProductsByCategory);        // Get available product                                 //Get all Products

export default proRoutes;