import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';


chai.use(chaiHttp);
let expect = chai.expect;

describe('SALES SECTION', () => {
    describe('GET \'/api/v1/sales/:id\'', () => { // GET SALES INVALID ID
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
    });
    describe('GET \'/api/v1/sales\'', () => { 
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
})