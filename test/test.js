import chai from 'chai';
import chaiHttp from 'chai-http';
import { products } from '../model/data';
// import { sales } from '../model/data';
import server from '../server/app';


chai.use(chaiHttp);
let expect = chai.expect;
describe('STOREMANUS', () => {  // ====================================== Empty the database
    beforeEach((done) => {
        products[1]= {};
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
});


