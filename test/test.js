process.env.NODE_ENV = "test";

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server_url = process.env.SERVER_URL || 'http://localhost:5000';
const should = chai.should();

chai.use(chaiHttp);

describe("Users", require("./users"));
describe("Food", require("./food"));
