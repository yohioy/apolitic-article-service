const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const Article = require('../modules/articles/Article');

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

describe('src/controllers/ArticlesController', () => {
  const articlesController = require('./ArticlesController');

  it('should return an Object', () => {
    expect(articlesController).to.be.an('object');
  });

  describe('getAll()', () => {
    it('should return status 200 with object on success', async () => {
      const req = mockRequest({ app: { locals: {} } });
      const res = mockResponse();
      const data = [
        {
          id: 'a123-b175-47ba-b9d9-94f2ce9f5b14',
          name: 'article 1',
          author: 'author 1',
          articleStatus: '1',
        },
      ];
      const response = { total: data.length, data: data };

      const stub = sinon.stub(Article.prototype, 'getAll').callsFake(() => {
        return response;
      });

      await articlesController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(response);
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });

    it('should return status 400 with object on fail', async () => {
      const req = mockRequest({
        app: { locals: { logger: { error: sinon.stub() } } },
      });
      const res = mockResponse();

      const response = { message: 'failed' };

      const stub = sinon.stub(Article.prototype, 'getAll').throws(() => {
        return new Error();
      });

      await articlesController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith(response);
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });
  });

  describe('getById()', () => {
    it('should return status 200 with object on success', async () => {
      const req = mockRequest({
        params: { id: 'a123-b175-47ba-b9d9-94f2ce9f5b14' },
        app: { locals: { logger: { error: sinon.stub() } } },
      });
      const res = mockResponse();
      const data = {
        id: 'a123-b175-47ba-b9d9-94f2ce9f5b14',
        name: 'article 1',
        author: 'author 1',
        articleStatus: '1',
      };

      const response = { data: data };

      const stub = sinon.stub(Article.prototype, 'getById').callsFake(() => {
        return response;
      });

      await articlesController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(response);
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });

    it('should return status 400 with object on fail', async () => {
      const req = mockRequest({
        params: { id: 'a123-b175-47ba-b9d9-94f2ce9f5b14' },
        app: { locals: { logger: { error: sinon.stub() } } },
      });
      const res = mockResponse();
      const response = { message: 'failed' };

      const stub = sinon.stub(Article.prototype, 'getById').throws(() => {
        return new Error();
      });

      await articlesController.getById(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith(response);
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });
  });
});
