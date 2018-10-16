import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to StoreManus API Home page. Go to /api/v1/users/products to view all products'));
router.get('/api/v1/products', (req, res) => res.send('ALL PRODUCTS'));

export default router;