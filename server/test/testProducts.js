import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import jwt from 'jsonwebtoken';


chai.use(chaiHttp);
let expect = chai.expect;

describe('PRODUCTS SECTION', () => {
    describe('POST \'/api/v1/products\'', () => {  //POST PRODUCT
        it('Post product with token access', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
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
    });
    describe('POST \'/api/v1/products\'', () => {  //POST PRODUCT WITH EMPTY FIELD
        it('Post product with token access', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
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
                    expect(res).to.have.status(200);    
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
        it('Get All Products without id', (done) => {
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
                    done();
                });
        });
    });
    describe('GET \'/api/v1/products\'', () => {  // GET ALL PRODUCTS 
        it('Get All Products with token', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .get('/api/v1/products')
                .send({
                    name: 'Luois',
                    price: 300,
                    quantity: 4,
                    type: 'sugar',
                    category: 'Beverage',
                                                     
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
    });
    describe('PUT \'/api/v1/products/:id\'', () => {  // EDIT SINGLE PRODUCTS 
        it('Edit Products with token', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .put('/api/v1/products/1')
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
    });
    describe('PUT \'/api/v1/products/:id\'', () => {  // DO NOT EDIT PRODUCT WHEN THE ID IS NOT A NUMBER 
        it('Do not edit Products when the id is not a number', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .put('/api/v1/products/ak')
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
    });
    describe('PUT \'/api/v1/products/:id\'', () => {  // DO NOT EDIT PRODUCT WHEN THE ID IS MORE THAN 999 
        it('Do not edit Products when the id is more than 999', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .put('/api/v1/products/1000')
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
    });
    describe('DELETE \'/api/v1/products/:id\'', () => {  // DELETE PRODUCTS 
        it('Delete Products with token', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .delete('/api/v1/products/1')
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
    });
    describe('DELETE \'/api/v1/products/:id\'', () => {  // DO NOT DELETE PRODUCTS WHEN THE ID IS ABOVE 999 
        it('Do not delete Products when the id is above 999', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .delete('/api/v1/products/1000')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Product id must be valid number');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
    });
    describe('GET \'/api/v1/products/:id\'', () => {  // GET SINGLE PRODUCTS 
        it('Get one Products with token', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .get('/api/v1/products/1')
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
    });
    describe('GET \'/api/v1/products/:id\'', () => {  // GET SINGLE PRODUCTS WITH ID THAT IS NOT NUMERIC
        it('Get one Products with id that is not numeric', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .get('/api/v1/products/the')
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
    describe('GET \'/api/v1/products/:id\'', () => {  // GET SINGLE PRODUCT WITH ID ABOVE 999 
        it('Get one Products when product id is greater than 999', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .get('/api/v1/products/1000')
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
    });

    describe('GET \'/api/v1/products/:id\'', () => {  // GET ONE PRODUCT PASSED
        it('Get one Product', () => {
            chai.request(server)
                .get('/api/v1/products/1')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');
                   
                });
        });
    });
    describe('GET \'/api/v1/products\'', () => {  // GET ALL PRODUCTS 
        it('Get all Products with token', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
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
    });

    describe('GET \'/api/v1/products/:id\'', () => {  // GET ONE PRODUCT PASSED
        it('Get one Product', () => {
            chai.request(server)
                .get('/api/v1/products/1')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');
                   
                });
        });
    });

    describe('GET \'/api/v1/products/:id\'', () => { 
        it('Throw error when product id is not valid', (done) => {
            chai.request(server)
                .get('/api/v1/products/:id')
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
    describe('PUT \'/api/v1/products/:id\'', () => {  // DO NOT EDIT PRODUCT WHEN THE ID IS ABOVE 999
        it('Do not edit product when ID is not a number', (done) => { 
            chai.request(server)
                .put('/api/v1/products/1000')
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
    describe('PUT \'/api/v1/products/:id\'', () => {  // DO NOT EDIT PRODUCT WHEN THE ID IS NOT PROVIDED
        it('Do not edit product when id is not provided', () => { 
            chai.request(server)
                .put('/api/v1/products/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(404);
                    expect(res).to.not.redirect;                     
                });
        });
    });
    describe('PUT \'/api/v1/products/:id\'', () => {  // EDIT PRODUCT WHEN ALL FIELDS ARE PROVIDED
        it('Edit product when all fields are provided', () => { 
            chai.request(server)
                .put('/api/v1/products/1')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');                    
                });
        });
    });

    describe('DELETE \'/api/v1/products/:id\'', () => { 
        it('Delete Products', (done) => {
            chai.request(server)
                .delete('/api/v1/products/:id')
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
    
    describe('GET \'/api/v1/products/:id\'', () => {  // DO NOT DELETE PRODUCT WHEN THE ID IS NOT A NUMBER 
        it('Get all Products with token', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .get('/api/v1/products/DS')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Products');                    
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Product id must be valid number');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
    });


});