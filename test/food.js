const chai = require('chai');
const chaiHttp = require('chai-http');
const server_url = process.env.SERVER_URL || 'http://localhost:5000';
const should = chai.should();

chai.use(chaiHttp);

module.exports = function () {
	describe("/GET Food", function () {
		it("should return food as an array", function (done) {
			chai.request(server_url)
			.get('/api/food')
			.end(function (err, res) {
				res.should.have.status(200);
                res.body.food.should.be.a('array');
              	done();
			});
		});
	});
}
