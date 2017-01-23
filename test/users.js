const chai = require('chai');
const chaiHttp = require('chai-http');
const server_url = process.env.SERVER_URL || 'http://localhost:5000';
const should = chai.should();

chai.use(chaiHttp);

module.exports = function () {
	describe("/GET users", function () {
		it("should return users as an array", function (done) {
			chai.request(server_url)
			.get('/api/user')
			.end(function (err, res) {
				res.should.have.status(200);
                res.body.users.should.be.a('array');
              	done();
			});
		});
	});
}
