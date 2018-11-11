import { Router } from 'express';
import ValidateSales from '../middlewares/validateSales';
import SalesController from '../controller/salesController'; 
import checkToken from '../middlewares/auth/checkToken';

const salesRoutes = Router();


//SALES
salesRoutes.post('/', checkToken, ValidateSales.postSales, SalesController.postSales);                     // Post Sales
salesRoutes.get('/', checkToken, SalesController.getSales);                                                // Get all Sales
salesRoutes.get('/:attendant', checkToken, SalesController.getAttendantSales);               // Get one sales
salesRoutes.get('/date/:date', checkToken, SalesController.getSalesByDate);               // Get one sales
export default salesRoutes;