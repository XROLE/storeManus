import chai from 'chai';
import chaiHttp from 'chai-http';
import { products } from '../model/data';
import { sales } from '../model/data';
import server from '../server/app';
import { isNumber } from '../middlewares/validate';
import { isValidNum } from '../middlewares/validate';
import { isEmpty } from '../middlewares/validate';
import validateSales from '../middlewares/validateSales';

var assert = require('assert');

chai.use(chaiHttp);
let expect = chai.expect;
describe('STOREMANUS', () => {  // ====================================== Empty the database
    beforeEach((done) => {
        products[1]= {};
        sales[1] = {};
        done();
    });
    describe('GET \'/\'', () => { 
        it('GET Home Page', (done) => {  // =============== Testing home page route
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.not.have.property('products');
                    done();
                }); 
        });
    });
    describe('GET \'/api/v1/products\'', () => {  // GET ALL PRODUCTS
        it('Get All Products', (done) => {
            chai.request(server)
                .get('/api/v1/products')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('products');                    
                    done();
                });
        });
    });
    describe('GET \'/api/v1/products/:id\'', () => {  // GET ONE PRODUCT
        it('Get one Product', () => {
            chai.request(server)
                .get('/api/v1/products/1')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('ID');
                    expect(res.body).to.have.property('Product');
                    expect(res.body).to.have.property('Success').eql(true);
                    expect(res.body).to.have.property('Message').eql('Products serverd');
                   
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
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;                   
                    done();
                });
        });
    });
    
    describe('GET \'/api/v1/sales\'', () => { 
        it('Get All sales', (done) => {
            chai.request(server)
                .get('/api/v1/sales')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('sales');
                    // expect(res.body.products).to.be.empty;
                    done();
                });
        });
    });

    describe('GET \'/api/v1/sales/:id\'', () => { 
        it('Get One Sale', (done) => {
            chai.request(server)
                .get('/api/v1/sales/:id')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    // expect(res.body).to.be.an('object');
                    // expect(res.body).to.have.property('ID');
                    // expect(res.body).to.have.property('message');
                    // expect(res.body).to.have.property('message').eql('Single sale');
                    // expect(res.body).to.have.property('success').eql(true);
                    // expect(res.body.products).to.be.empty;
                    done();
                });
        });
    });
    describe('POST \'/api/v1/products\'', () => {  // REJECT POST BECAUSE OF EMPTY FIELDS
        it('Post Products', (done) => {
            chai.request(server)
                .post('/api/v1/products')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res.body).to.have.property('Success').eql(false);
                    expect(res.body).to.have.property('Message').eql('No empty field is allowed. Please make sure you fill all fields');
                    done();
                });
        });
    });
    describe('POST \'/api/v1/sales\'', () => { 
        it('Post Sales', (done) => {
            chai.request(server)
                .post('/api/v1/sales')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    // expect(res.body).to.be.an('object');                   
                    // expect(res.body).to.have.property('message');
                    // expect(res.body).to.have.property('message').eql('Sales added succesfully');
                    // expect(res.body).to.have.property('success').eql(true);
                    // expect(res.body.products).to.be.empty;
                    done();
                });
        });
    });
    describe('PUT \'/api/v1/products/:id\'', () => {  // DO NOT 
        it('Do not edit product when ID is not a number', (done) => { // DO NOT EDIT PRODUCT WHEN THE ID IS NOT A NUMBER
            chai.request(server)
                .put('/api/v1/products/:id')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect; 
                    expect(res.body).to.be.an('object');                   
                    expect(res.body).to.have.property('Success').eql(false);                   
                    expect(res.body).to.have.property('Message').eql('Product id must be valid number');                   
                    done();
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
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;                    
                    done();
                });
        });
    });
});
describe('DELETE \'/api/v1/products/:id\'', () => { // THROW ERROR WHEN THE PRODUCT ID IS ABOVE 999
    it('Delete Products', (done) => {
        chai.request(server)
            .delete('/api/v1/products/1000')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.headers;
                expect(res).to.have.status(400);
                expect(res).to.not.redirect;                    
                expect(res.body).to.be.an('object');                    
                expect(res.body).to.be.have.property('Success').eql(false);                    
                expect(res.body).to.be.have.property('Message').eql('Product id is too long');                    
                done();
            });
    });
});

// Functional test for validation
describe('Test Validation functions', function () {
    it('Should return true when a number is provided', function () {
        assert.equal( isNumber(5), true);
    });
    it('Should return false if the length of the number is not equal to 13', function () {
        assert.equal( isValidNum(9999999999999), false);
    });
    it('Should return false if the input is not empty', function () {
        assert.equal( isEmpty(8), false);
    });
});

// // Test conditional statements in validateSales.js
// describe('Validate sales record', function(){
//     it('should post sales when all fields are provided in the right format', function(){
//         validateSales.postSales.req.body.Name = 'Luna Milk';       
//         validateSales.postSales.req.Type = 'Milk';       
//         validateSales.postSales.req.Category = 'Beverage';       
//         const newPostSales = validateSales.postSales;
//         assert.equal(newPostSales, next());
//     });
// });


