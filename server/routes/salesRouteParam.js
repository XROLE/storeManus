import { Router } from 'express';
import ValidateSales from '../middlewares/validateSales';
import SalesController from '../controller/salesController'; 
import checkToken from '../middlewares/auth/checkToken';

const salesRoutesParams = Router();

salesRoutesParams.get('/:id', checkToken, ValidateSales.getOneSales, SalesController.getOneSale);               // Get one sales

export default salesRoutesParams;