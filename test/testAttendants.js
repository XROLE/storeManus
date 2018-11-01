import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';


chai.use(chaiHttp);
let expect = chai.expect;

describe('ATTENDANTS SECTION', () => {
    describe('POST \'/api/v1/attendants\' ', () => {
        it('Should register an Attendant', () => {
            chai.request(server)
                .post('localhost:5000/api/v1/attendants')
                .end((req, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.headers;
                    expect(res).to.have.status(401);
                    expect(res).to.not.redirect;
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('Success').eql(false);                    
                    expect(res.body).to.have.property('Message').eql('Unauthorized user access');  
                })

                })
        });
    });
});