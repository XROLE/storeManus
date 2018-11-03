import chai from 'chai';
import chaiHttp from 'chai-http';
import { products } from '../model/data';
import { sales } from '../model/data';
import server from '../app';
import { isNumber } from '../middlewares/validate';
import { isValidNum } from '../middlewares/validate';
import { isEmpty } from '../middlewares/validate';


var assert = require('assert');

chai.use(chaiHttp);
let expect = chai.expect;
describe('STOREMANUS', () => {  // ====================================== Empty the database PASSED
    beforeEach((done) => {
        products[1]= {};
        sales[1] = {};
        done();
    });
    describe('GET \'/\'', () => { 
        it('GET Home Page', (done) => {  // =============== Testing home page route  PASSED
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
    
  
    describe('POST \'/api/v1/admin/auth/signin\'', () => { // SIGN IN ADMIN 
        it('Admin sign in', (done) => {
            chai.request(server)
                .post('/api/v1/admin/auth/signin')
                .send({
                    mail: 'xrolediamond@gmil.com',
                    pass: 'xrolevalsido27'                                                   
                })            
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('User email or password is incorrect');
                    done();
                });
        });
    });
    describe('POST \'/api/v1/admin/auth/signin\'', () => { // DO NOT SIGN IN ADMIN WITH INCORRECT DETAILS
        it('Admin sign in', (done) => {
            chai.request(server)
                .post('/api/v1/admin/auth/signin')
                .send({
                    mail: 'xrolediamond@gmail.com',
                    pass: 'xrolevalsido2634'                                                   
                })            
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('You are successfully signed in');
                    done();
                });
        });
    });
    
    // describe('PUT \'/api/v1/products/:id\'', () => {  // DO NOT EDIT PRODUCT WHEN THE ID IS NOT A NUMBER
    //     it('Do not edit product when ID is not a number', (done) => { 
    //         chai.request(server)
    //             .put('/api/v1/products/:id')
    //             .end((err, res) => {
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.headers;
    //                 expect(res).to.have.status(400);
    //                 expect(res).to.not.redirect;
    //                 expect(res).to.be.an('object');
    //                 expect(res.body).to.have.property('Success').eql(false);                    
    //                 expect(res.body).to.have.property('Message').eql('Bad request!, Product id must be valid number');                   
    //                 done();
    //             });
    //     });
    // });
    
});
// describe('DELETE \'/api/v1/products/:id\'', () => { // THROW ERROR WHEN THE PRODUCT ID IS ABOVE 999
//     it('Throw error when delete product id is above 999', (done) => {
//         chai.request(server)
//             .delete('/api/v1/products/1000')
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.headers;
//                 expect(res).to.have.status(400);
//                 expect(res).to.not.redirect;                    
//                 expect(res.body).to.be.an('object');                    
//                 expect(res.body).to.be.have.property('Success').eql(false);                    
//                 expect(res.body).to.be.have.property('Message').eql('Product id is too long'); 
//                 done();                   
//             });
//     });
// });

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



