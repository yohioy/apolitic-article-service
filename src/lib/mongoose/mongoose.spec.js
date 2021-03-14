const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const mongoose = require('mongoose');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

const mockRequest = (data) => {
  return data;
};

describe('src/lib/mongoose/mongoose.js', () => {
  const connection = require('./mongoose');
  const req = mockRequest({});
  const res = mockResponse();

  const nextSpy = sinon.spy();
  let stub;

  it('should return a function', async () => {
    stub = sinon.stub(mongoose, 'connect');
    await connection()(req, res, nextSpy);
    expect(connection()).to.be.a('function');
    stub.restore();
  });

  it('should call the mongoose connect', async () => {
    stub = sinon.stub(mongoose, 'connect');
    await connection()(req, res, nextSpy);
    expect(stub.called).to.be.equal(true);
    stub.restore();
  });

  it('should call the next()', async () => {
    stub = sinon.stub(mongoose, 'connect');
    await connection()(req, res, nextSpy);
    expect(nextSpy.called).to.be.equal(true);
    stub.restore();
  });

  it('should send 500 response on error', async () => {
    stub = sinon.stub(mongoose, 'connect').throws(() => {
      return new Error();
    });
    const response = { message: 'Database connection error' };
    await connection()(req, res, nextSpy);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith(response);
    stub.restore();
  });
});
