import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/route';
import attRoutes from './routes/attRoutes';



dotenv.config();  // configuring environment variable

// Initial express app
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/v1/attendants', attRoutes);
app.use('/', router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started and runing on port 5000.....');
});


export default app;


