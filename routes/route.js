import { Router } from 'express';
import storeDB from '../model/db';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to StoreManus API Home page. Go to /api/v1/users/products to view all products'));

router.get('/api/v1/products', storeDB.getProducts);
router.get('/api/v1/products/:id', storeDB.getOneProduct);
router.get('/api/v1/sales', storeDB.getSales);
router.get('/api/v1/sales/:id', storeDB.getOneSale);
router.post('/api/v1/products', storeDB.postProducts);
router.post('/api/v1/sales', storeDB.postSales);
router.put('/api/v1/products/:id', storeDB.putProducts);
router.delete('/api/v1/products/:id', storeDB.deleteProduct);

export default router;