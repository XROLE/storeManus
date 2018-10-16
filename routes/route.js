import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to StoreManus API Home page. Go to /api/v1/users/products to view all products'));
router.get('/api/v1/products', (req, res) => res.send('ALL PRODUCTS'));
router.get('/api/v1/products/:id', (req, res) => res.send('SINGLE PRODUCT'));
router.get('/api/v1/sales', (req, res) => res.send('ALL SALES'));
router.get('/api/v1/sales/:id', (req, res) => res.send('SINGLE SALES'));
router.post('/api/v1/products', (req, res) => res.send('POSTED PRODUCTS'));
router.post('/api/v1/sales', (req, res) => res.send('POSTED SALES'));
router.put('/api/v1/products', (req, res) => res.send('EDITED PRODUCTS'));
router.delete('/api/v1/products', (req, res) => res.send('DELETED PRODUCTS'));

export default router;