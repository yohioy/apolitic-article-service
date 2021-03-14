const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const ArticleModel = require('./article.model');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;

describe('src/modules/articles/Article', () => {
  const Article = require('./Article');
  let article;
  before(() => {
    article = new Article();
  });

  it('should return an Object', () => {
    expect(article).to.be.an('object');
  });

  describe('getAll()', () => {
    it('should return an an object', async () => {
      const data = [
        {
          _id: '604d5701c476c035ef3ee3ba',
          title: 'Amet dolorum odio repellendus perferendis.',
          articleStatus: '1',
        },
        {
          _id: '604d5701c476c035ef3ee3bc',
          title: 'Vel unde sunt.',
          articleStatus: '1',
        },
      ];

      const stub = sinon.stub(ArticleModel, 'find').callsFake(() => {
        return data;
      });
      const spy = sinon.spy(article, 'getAll');

      const response = await article.getAll('1');

      expect(response).to.be.an('object');
      expect(response).to.have.property('total').and.be.a('number');
      expect(response).to.have.property('data').and.be.an('array');
      expect(spy.getCall(0).args).to.have.lengthOf(1);
      stub.restore();
    });
  });

  describe('getById()', () => {
    it('should return an an object', async () => {
      const id = '604d5701c476c035ef3ee3ba';
      const data = {
        _id: '604d5701c476c035ef3ee3ba',
        title: 'Amet dolorum odio repellendus perferendis.',
        articleStatus: '1',
      };
      const stub = sinon.stub(ArticleModel, 'find').callsFake(() => {
        return data;
      });

      const spy = sinon.spy(article, 'getById');

      const response = await article.getById(id);

      expect(spy.getCall(0).args).to.have.lengthOf(1);
      expect(response).to.be.an('object');
      expect(response).to.have.property('data').and.be.an('object');
      stub.restore();
    });
  });

  describe('createCollection()', () => {
    it('should return an an object', async () => {
      const stub = sinon
        .stub(ArticleModel, 'createCollection')
        .callsFake(() => {
          return {};
        });
      const response = await article.createCollection();
      expect(response).to.be.an('object');
      stub.restore();
    });
  });

  describe('dropCollection()', () => {
    it('should return an an object', async () => {
      const stub = sinon.stub(ArticleModel.collection, 'drop').callsFake(() => {
        return {};
      });
      const response = await article.dropCollection();
      expect(response).to.be.an('object');
      stub.restore();
    });
  });

  describe('bulkCreate()', () => {
    it('should return an an object', async () => {
      const stub = sinon.stub(ArticleModel, 'insertMany').callsFake(() => {
        return {};
      });
      const response = await article.bulkCreate();
      expect(response).to.be.an('object');
      stub.restore();
    });
  });

  describe('removeAll()', () => {
    it('should return an an object', async () => {
      const stub = sinon.stub(ArticleModel, 'deleteMany').callsFake(() => {
        return {};
      });
      const response = await article.removeAll();
      expect(response).to.be.an('object');
      stub.restore();
    });
  });
});
