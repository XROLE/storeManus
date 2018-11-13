import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import jwt from 'jsonwebtoken';

const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
const secret = process.env.jwt_secret;
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

chai.use(chaiHttp);
let expect = chai.expect;
describe('SALES SECTION', () => {
    describe('POST SALES', () => {  //POST SALES
        it('Post sales with token access', (done) => {            
            chai.request(server)
                .post('/api/v1/sales')
                .send({
                    attendant: 'mallam',
                    name: 'Milo',
                    price: 50,
                    quantity: 3,
                    type: 'chocolate',
                    category: 'Beverage',
                    total: 450,                                 
                })
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);    
                    expect(res).to.be.an('object');                
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('Sales added succesfully');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Do not post sales with empty fields', (done) => {      
            chai.request(server)
                .post('/api/v1/sales')
                .send({   })
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
        it('Do not post sales with when price, quantity and total are not valid numbers', (done) => {           
            chai.request(server)
                .post('/api/v1/sales')
                .send({
                    attendant: 'mallam',
                    name: 'Milo',
                    price: 9,
                    quantity: 'jkg',
                    type: 'chocolate',
                    category: 'Beverage',
                    total: 'oiu',                                 
                })
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);    
                    expect(res).to.be.an('object');                
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Only numbers are allowed in the Price and Quantity field');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
    });
   
    describe('GET SALES', () => { // GET SALES INVALID ID
        it('Get One Sale', (done) => {
            chai.request(server)
                .get('/api/v1/sales/:id')
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
        it('Get sales with token', (done) => {             
            chai.request(server)
                .get('/api/v1/sales')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('ALL SALES');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get single sale with token', (done) => {         
            chai.request(server)
                .get('/api/v1/sales/1')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('Single sale');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get single sale when id > 999', (done) => {        
            chai.request(server)
                .get('/api/v1/sale/1000')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Sales id is too long');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get single sale when id is not a number', (done) => {      
            chai.request(server)
                .get('/api/v1/sale/kj')
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Sales id must be valid number');
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
        it('Get All sales', (done) => {
            chai.request(server)
                .get('/api/v1/sales')
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