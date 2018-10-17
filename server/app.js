import express from 'express';
import bodyParser from 'body-parser';
import router from '../routes/route';


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started and runing on port 5000.....');
});


