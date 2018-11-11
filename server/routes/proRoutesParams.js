import { Router } from 'express';
import ValidatProduct from '../middlewares/validateProduct';
import ProductController from '../controller/productController';
import checkToken from '../middlewares/auth/checkToken';

const proRoutesParams = Router();                              
proRoutesParams.delete('/:id',checkToken,  ValidatProduct.deleteProduct, ProductController.deleteProduct); //Delete product
proRoutesParams.get('/:id', checkToken, ValidatProduct.getOneProduct, ProductController.getOneProduct);    // Get single product
proRoutesParams.put('/:id',checkToken, ValidatProduct.editProduct, ProductController.putProducts );       // Edit product

export default proRoutesParams;