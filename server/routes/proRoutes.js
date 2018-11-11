import { Router } from 'express';
import ValidatProduct from '../middlewares/validateProduct';
import ProductController from '../controller/productController';
import checkToken from '../middlewares/auth/checkToken';

const proRoutes = Router();

proRoutes.post('/', checkToken, ValidatProduct.postProduct, ProductController.postProduct);                      //Post Products
proRoutes.get('/', checkToken, ProductController.getProducts);                                       //Get all Products
proRoutes.get('/available', ProductController.getAvailableProducts);                                // Get available product                                 //Get all Products
proRoutes.get('/finished', ProductController.getFinishedProducts);                                // Get available product                                 //Get all Products
proRoutes.get('/cat/:category', ProductController.getProductsByCategory);                                // Get available product                                 //Get all Products

export default proRoutes;