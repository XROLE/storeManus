import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import jwt from 'jsonwebtoken';


chai.use(chaiHttp);
let expect = chai.expect;

const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
const secret = process.env.jwt_secret;
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

describe('PRODUCTS SECTION', () => {
    describe('POST PRODUCTS', () => {  //POST PRODUCT
        it('Post product with token access', (done) => {           
            chai.request(server)
                .post('/api/v1/products')
                .send({
                    name: 'Milo',
                    price: 50,
                    quantity: 3,
                    type: 'chocolate',
                    category: 'Beverage'                                 
                })
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);    
                    expect(res).to.be.an('object');                
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('Product added successfully');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Post products with empty name field', (done) => {            
            chai.request(server)
                .post('/api/v1/products')
                .send({
                    name: '',
                    price: 7,
                    quantity: 3,
                    type: 'chocolate',
                    category: 'Beverage'                                 
                })
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);    
                    expect(res).to.be.an('object');                
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('No empty field is allowed. Please make sure you fill all fields');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
    });
    
    describe('GET \'/api/v1/products\'', () => {  // GET ALL PRODUCTS PASSED WITHOUT ID
        it('Get All Products without token', (done) => {
            chai.request(server)
                .get('/api/v1/products')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');                    
                });
            done();
        });
        it('Get products by category', (done) => {
            chai.request(server)
                .get('/api/v1/products/cat/:Beverage')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');                    
                });
            done();
        });        
        it('Get one Products when product id is greater than 999', (done) => {         
            chai.request(server)
                .get('/api/v1/product/1000')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Bad request. Product id is not recognise');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get one Products with id that is not numeric', (done) => {            
            chai.request(server)
                .get('/api/v1/product/the')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Bad request!, Product id must be valid number');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get All Products with token', (done) => {            
            chai.request(server)
                .get('/api/v1/products')                
                .set('x-access-token', `Bearer ${token}`)
                .then((response) => {
                    expect(response).to.have.status(200);
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get one Products with token', (done) => {           
            chai.request(server)
                .get('/api/v1/product/1')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('Products serverd');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get all Products with token', (done) => {          
            chai.request(server)
                .get('/api/v1/products')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Products');                    
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('ALL PRODUCTS');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get one Product without token', (done) => {
            chai.request(server)
                .get('/api/v1/product/1')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');                   
                });
            done();
        });
        it('Get one Product without token', (done) => {
            chai.request(server)
                .get('/api/v1/product/1')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');
                   
                });
            done();
        });
        it('Get product withot access token', (done) => {
            chai.request(server)
                .get('/api/v1/product/1')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');
                });
            done();
        });
        it('Get product with invalid id', (done) => {      
            chai.request(server)
                .get('/api/v1/product/DS')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');                                    
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Bad request!, Product id must be valid number');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
    });
    
    describe('PUT \'/api/v1/product/:id\'', () => {  // EDIT SINGLE PRODUCTS 
        it('Edit Products with token', (done) => {          
            chai.request(server)
                .put('/api/v1/product/1')
                .send({
                    name: 'Luois',
                    price: 300,
                    quantity: 4,
                    type: 'Beverag',
                    category: 'Beverage',
                    id: 1
                                                     
                })
                .set('x-access-token', `Bearer ${token}`)
                .then((response) => {
                    expect(response).to.have.status(200);
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Edit Product with invalid id', (done) => { // DO NOT EDIT PRODUCT WHEN THE ID IS NOT A NUMBER           
            chai.request(server)
                .put('/api/v1/product/ak')
                .send({
                    name: 'Luois',
                    price: 300,
                    quantity: 4,
                    type: 'Beverag',
                    category: 'Beverage',
                    id: 'hgf'                                                     
                })
                .set('x-access-token', `Bearer ${token}`)
                .then((response) => {
                    expect(response).to.have.status(400);
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Edit products when the id is above than 999', (done) => {          
            chai.request(server)
                .put('/api/v1/product/1000')
                .send({
                    name: 'Luois',
                    price: 300,
                    quantity: 4,
                    type: 'Beverag',
                    category: 'Beverage',
                    id: '1000'
                                                     
                })
                .set('x-access-token', `Bearer ${token}`)
                .then((response) => {
                    expect(response).to.have.status(400);
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Edit product without access token', (done) => { 
            chai.request(server)
                .put('/api/v1/product/1000')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');                 
                    done();
                });
        });
        it('Edit product without an id', () => { 
            chai.request(server)
                .put('/api/v1/product/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(404);
                    expect(res).to.not.redirect;                     
                });
        });        
    });
   
    describe('DELETE PRODUCTS', () => {  // DELETE PRODUCTS 
        it('Delete Products with token', (done) => {            
            chai.request(server)
                .delete('/api/v1/product/1')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('Product deleted succesfully');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Delete product when id is above 999', (done) => {             
            chai.request(server)
                .delete('/api/v1/product/1000')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Product id is too long');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Delete Product without a token', (done) => {
            chai.request(server)
                .delete('/api/v1/product/:id')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');                   
                    done();
                });
        });
    });
});