import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from '../routes/route';
import bcrypt from 'bcrypt';


dotenv.config();  // configuring environment variable
const saltRounds = 10;

// Initial express app
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', router);

bcrypt.hash('IamachosenONE', saltRounds).then((hash) => {
    console.log(hash);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started and runing on port 5000.....');
});


export default app;


