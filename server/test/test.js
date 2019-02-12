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
                    email: 'xrolediamond@gmil.com',
                    password: 'xrolevalsido27'                                                   
                })            
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('User email or password is incorrect');
                    done();
                });
        });
        it('Admin sign in', (done) => {
            chai.request(server)
                .post('/api/v1/admin/auth/signin') 
                .send({
                    email: 'xrolediamond@gmail.com',
                    password: 'xrolevalsido2634'                                                   
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



