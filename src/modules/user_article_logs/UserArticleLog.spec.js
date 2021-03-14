const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const UserArticleLogModel = require('./userArticleLog.model');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('src/modules/user_article_logs/UserArticleLog', async () => {
  const UserArticleLog = require('./UserArticleLog');
  let userArticleLog;

  before(() => {
    userArticleLog = new UserArticleLog();
  });

  it('should return an Object', () => {
    expect(userArticleLog).to.be.an('object');
  });

  describe('removeAll()', () => {
    it('should return an Object', async () => {
      const stub = sinon
        .stub(UserArticleLogModel, 'deleteMany')
        .callsFake(() => {
          return Promise.resolve({});
        });

      const response = await userArticleLog.removeAll();
      expect(response).to.be.an('object');
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });
  });

  describe('createOrUpdate()', () => {
    it('should return an Object', async () => {
      const spy = sinon.spy(userArticleLog, 'createOrUpdate');
      const stub = sinon
        .stub(UserArticleLogModel, 'updateOne')
        .callsFake(() => {
          return Promise.resolve({});
        });

      const newData = { guestId: '1g2gf34f5g6v6', viewedArticles: [] };
      const response = await userArticleLog.createOrUpdate(newData);

      expect(spy.getCall(0).args).to.have.lengthOf(1);
      expect(response).to.be.an('object');
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });
  });

  describe('getByGuestId()', () => {
    it('should return an Object', async () => {
      const guestId = '1g2gf34f5g6v6';
      const spy = sinon.spy(userArticleLog, 'getByGuestId');
      const stub = sinon.stub(UserArticleLogModel, 'findOne').callsFake(() => {
        return Promise.resolve({});
      });

      const response = await userArticleLog.getByGuestId(guestId);

      expect(spy.getCall(0).args).to.have.lengthOf(1);
      expect(response).to.be.an('object');
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });
  });

  describe('createCollection()', () => {
    it('should return an Object', async () => {
      const stub = sinon
        .stub(UserArticleLogModel, 'createCollection')
        .callsFake(() => {
          return Promise.resolve({});
        });

      const response = await userArticleLog.createCollection();

      expect(response).to.be.an('object');
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });
  });

  describe('dropCollection()', () => {
    it('should return an Object', async () => {
      const stub = sinon
        .stub(UserArticleLogModel.collection, 'drop')
        .callsFake(() => {
          return Promise.resolve({});
        });

      const response = await userArticleLog.dropCollection();

      expect(response).to.be.an('object');
      expect(stub.called).to.be.equal(true);
      stub.restore();
    });
  });
});
