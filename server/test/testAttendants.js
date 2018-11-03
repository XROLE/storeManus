import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import jwt from 'jsonwebtoken';



chai.use(chaiHttp);
let expect = chai.expect;

describe('ATTENDANTS SECTION', () => {
    describe('GET \'/api/v1/attendants\'', () => {  //ADD ATTENDANT
        it('Post an Attendant with token access', (done) => {
            const payload = {password: 'xrolevalsido2634', email: 'xrolediamond@gmail.com' };
            const secret = process.env.jwt_secret;
            const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 
            chai.request(server)
                .post('/api/v1/attendants')
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
                })
                .catch((e) => {
                    console.log(e);
                });
            done();
        });
    });

    describe('POST \'/api/v1/admin/auth/signin\'', () => { 
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
    });
    describe('POST \'/api/v1/admin/auth/signin\'', () => { // DO NOT SIGN IN ATTENDANT WITH INVALID EMAIL
        it('Attendant sign in', (done) => {
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
    });
    describe('POST \'/api/v1/admin/auth/signin\'', () => { // DO NOT SIGN IN ATTENDANT WITH WRONG PASSWORD
        it('Attendant sign in', (done) => {
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
        it('Post an Attendant', () => {
            chai.request(server)
                .get('/api/v1/attendants')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(404);
                    expect(res).to.not.redirect;
                });
        });
    });
});

