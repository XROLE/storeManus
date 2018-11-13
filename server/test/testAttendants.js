import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import jwt from 'jsonwebtoken';

//GENERATE ACCESS TOKEN
const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
const secret = process.env.jwt_secret;
const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 

chai.use(chaiHttp);
let expect = chai.expect;

describe('ATTENDANTS SECTION', () => {
    describe('POST ATTENDANTS', () => {  //ADD ATTENDANT
        it('Create an Attendant', (done) => {            
            chai.request(server)
                .post('/api/v1/attendants/auth/register')
                .send({
                    firstName: 'xrole',
                    lastName: 'diamond',
                    email: 'xrolediamond@gmail.com',
                    password: 'iamachosenone'                                 
                })
                .set('x-access-token', `Bearer ${token}`)
                .then((res) => {
                    expect(res).to.have.status(200);    
                    expect(res).to.be.an('object');                
                    expect(res.body).to.have.property('Success').eql(true);                    
                    expect(res.body).to.have.property('Message').eql('You have successfully added an attendant');
                });
                
            done();
        });
        it('Attendant sign in', (done) => {
            chai.request(server)
                .post('/api/v1/attendants/auth/signin')
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
                    expect(res.body).to.have.property('Message').eql('You are signed in successfuly');
                    expect(res.body).to.have.property('Token');                    
                });
            done();
        });
        it('Invalid email sign in', (done) => {  // INVALID EMAIL SIGN IN
            chai.request(server)
                .post('/api/v1/attendants/auth/signin')
                .send({
                    email: 'xrolediamondcom',
                    password: 'xrolevalsido2634'                                                   
                })  
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Invalid email format');
                });
            done();
        });
        it('Attendant sign in with incorrrect password', (done) => {
            chai.request(server)
                .post('/api/v1/attendants/auth/signin')
                .send({
                    email: 'xrolediamond@gmail.com',
                    password: 'GSDF'                                                   
                })  
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(400);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Password do not match. Please enter the correct password');
                });
            done();
        });
    });
    describe('GET \'/api/v1/attendants\'', () => {  // ADD ATTENDANT WITHOUT TOKEN
        it('Get all Attendants', () => {
            chai.request(server)
                .get('/api/v1/attendants')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                });
        });
    });
});

