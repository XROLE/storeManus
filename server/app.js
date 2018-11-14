import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/route';
import attRoutes from './routes/attRoutes';
import proRoutes from './routes/proRoutes';
import proRoutesParams from './routes/proRoutesParams';
import salesRoutes from './routes/salesRoutes';
import salesRoutesParams from './routes/salesRouteParam';




dotenv.config();  // configuring environment variable

// Initial express app
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/v1/attendants', attRoutes);
app.use('/api/v1/products', proRoutes);
app.use('/api/v1/product', proRoutesParams);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/sale', salesRoutesParams);
app.use('/', router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started and runing on port 5000.....');
});


export default app;


