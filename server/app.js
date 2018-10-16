import express from 'express';
import router from '../routes/route';

const app = express();
app.use('/', router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started and runing on port 5000.....');
});


