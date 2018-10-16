import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hi, you have succesfully installed expres js');
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started and runing on port 5000.....')
});

