const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

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
      const response = await article.getAll();

      expect(response).to.be.an('object');
      expect(response).to.have.property('total').and.be.a('number');
      expect(response).to.have.property('data').and.be.an('object');
    });
  });

  describe('getById()', () => {
    it('should return an an object', async () => {
      const id = 'aaa-b175-47ba-b9d9-94f2ce9f5b14';
      const spy = sinon.spy(article, 'getById');

      const response = await article.getById(id);
      expect(spy.getCall(0).args).to.have.lengthOf(1);
      expect(response).to.be.an('object');
      expect(response).to.have.property('data').and.be.an('object');
    });
  });

  describe('createCollection()', () => {
    it('should return an an object', async () => {
      const response = await article.createCollection();
      expect(response).to.be.an('object');
    });
  });

  describe('dropCollection()', () => {
    it('should return an an object', async () => {
      const response = await article.dropCollection();
      expect(response).to.be.an('object');
    });
  });

  describe('bulkCreate()', () => {
    it('should return an an object', async () => {
      const response = await article.bulkCreate();
      expect(response).to.be.an('object');
    });
  });

  describe('removeAll()', () => {
    it('should return an an object', async () => {
      const response = await article.removeAll();
      expect(response).to.be.an('object');
    });
  });
});
