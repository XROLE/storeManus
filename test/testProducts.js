import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import jwt from 'jsonwebtoken';


chai.use(chaiHttp);
let expect = chai.expect;

describe('PRODUCTS SECTION', () => {
    describe('GET \'/api/v1/products\'', () => {  // GET ALL PRODUCTS PASSED
        it('Get All Products', (done) => {
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
    describe('PUT \'/api/v1/products/:id\'', () => {  // DO NOT EDIT PRODUCT WHEN THE ID IS ABOVE 999
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


})