console.log('starting test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

if (!global.Promise) {
    var q = require('q');
    chai.request.addPromises(q.Promise);
}


describe('Test Retrive Single User Info', function () {  
    
        var requestResult;
        var response;

        before(function (done) {
            chai.request("http://localhost:8080")
                .get("/app/user/1")    
                .end(function (err, res) {
                    requestResult = res.body;
                    response = res;
                    expect(err).to.be.null;
                    done();
                });
            });
        
        it('Should return an proper object', function (){
            expect(response).to.have.status(200);
            expect(response).to.have.headers;
        });

        it('The the user info has known properties', function(){
            expect(requestResult).to.include.keys('userId');
            expect(requestResult).to.have.property('userName');
            expect(response.body).to.have.deep.property('followers');
            expect(response.body).to.not.be.a.string;
        });


        it('The the user info has the expecte properties', function(){
            expect(requestResult).to.have.property('userId').that.is.a('number');
            expect(requestResult).to.have.property('userName').that.is.a('string');
            expect(requestResult).to.have.property('followers').that.is.a('number');
            expect(requestResult).to.have.property('following').that.is.a('number');
            expect(requestResult).to.have.property('likes').that.is.a('number');
        });	
        
    });

