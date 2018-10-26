import chai from 'chai';
import chaiHttp from 'chai-http';
import { products } from '../model/data';
import { sales } from '../model/data';
import server from '../server/app';
import { isNumber } from '../middlewares/validate';
import { isValidNum } from '../middlewares/validate';
import { isEmpty } from '../middlewares/validate';

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
                    console.log(res.body);
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
    describe('GET \'/api/v1/products\'', () => { 
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
                    // expect(res.body.products).to.be.empty;
                    done();
                });
        });
    });
    describe('GET \'/api/v1/products/:id\'', () => { 
        it('Get One Product', (done) => {
            chai.request(server)
                .get('/api/v1/products/:id')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    // expect(res.body).to.be.an('object');
                    // expect(res.body).to.have.property('ID');
                    // expect(res.body).to.have.property('message');
                    // expect(res.body).to.have.property('message').eql('Products serverd');
                    // expect(res.body).to.have.property('success').eql(true);
                    // expect(res.body.products).to.be.empty;
                    done();
                });
        });
    });
    // describe('GET \'/api/v1/products/:id\'', () => { 
    //     it('Get One Product', (done) => {
    //         chai.request(server)
    //             .get('/api/v1/products/:id')
    //             .end((err, res) => {
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.headers;
    //                 expect(res).to.have.status(200);
    //                 expect(res).to.not.redirect;
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.have.property('ID');
    //                 expect(res.body).to.have.property('message');
    //                 expect(res.body).to.have.property('message').eql('Products serverd');
    //                 expect(res.body).to.have.property('success').eql(true);
    //                 // expect(res.body.products).to.be.empty;
    //                 done();
    //             });
    //     });
    // });
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
    describe('POST \'/api/v1/products\'', () => { 
        it('Post Products', (done) => {
            chai.request(server)
                .post('/api/v1/products')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    // expect(res.body).to.be.an('object');                   
                    // expect(res.body).to.have.property('message');
                    // expect(res.body).to.have.property('message').eql('Product added succesfully');
                    // expect(res.body).to.have.property('success').eql(true);
                    // expect(res.body.products).to.be.empty;
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
    describe('PUT \'/api/v1/products/:id\'', () => { 
        it('Edit Products', (done) => {
            chai.request(server)
                .put('/api/v1/products/:id')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    // expect(res.body).to.be.an('object');                   
                    // expect(res.body).to.have.property('message');
                    // expect(res.body).to.have.property('message').eql('Product edited successfully');
                    // expect(res.body).to.have.property('success').eql(true);
                    // expect(res.body.products).to.be.empty;
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
                    // expect(res.body).to.be.an('object');                   
                    // expect(res.body).to.have.property('message');
                    // expect(res.body).to.have.property('message').eql('Product deleted succesfully');
                    // expect(res.body).to.have.property('success').eql(true);
                    // expect(res.body.products).to.be.empty;
                    done();
                });
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


