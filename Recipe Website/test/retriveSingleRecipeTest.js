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

describe('Test server with no arguments', function () {
    this.timeout(15000);

    it('should return 200', function (done) {
        http.get('http://localhost:8080/app/recipe/1', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});