const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const UserArticleLog = require('../modules/user_article_logs/UserArticleLog');

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

describe('src/controllers/UserArticleLogController', () => {
  const userArticleLogController = require('./UserArticleLogController');

  it('should return an Object', () => {
    expect(userArticleLogController).to.be.an('object');
  });

  describe('createUserLog()', () => {
    it('should return status 200 with object on success', async () => {
      const req = mockRequest({
        params: { id: '604e5b948ee57536d1be7f3e' },
        app: {
          locals: {
            cookieTokens: [{ name: 'guuid', value: '000000000001' }],
            logger: {},
          },
        },
      });

      const res = mockResponse();

      const stubGetByGuestId = sinon
        .stub(UserArticleLog.prototype, 'getByGuestId')
        .callsFake(() => {
          return {
            _id: '604d63c92959b2806753548f',
            guestId: '03c62141-adc2-454d-8973-e60108606ba3',
            viewedArticles: ['604d5701c476c035ef3ee3ba'],
          };
        });

      const stubCreateOrUpdate = sinon
        .stub(UserArticleLog.prototype, 'createOrUpdate')
        .callsFake(() => {
          return Promise.resolve({});
        });

      const nextSpy = sinon.spy();

      await userArticleLogController.createUserLog(req, res, nextSpy);

      expect(nextSpy.called).to.be.equal(true);
      expect(stubGetByGuestId.called).to.be.equal(true);
      expect(stubCreateOrUpdate.called).to.be.equal(true);
      stubGetByGuestId.restore();
      stubCreateOrUpdate.restore();
    });

    it('should return status 400 with object on fail', async () => {
      const req = mockRequest({
        params: { id: '604e5b948ee57536d1be7f3e' },
        app: {
          locals: {
            cookieTokens: [{ name: 'guuid', value: '000000000001' }],
            logger: { error: sinon.stub() },
          },
        },
      });

      const res = mockResponse();

      const response = { message: 'failed creating log' };

      const stubGetByGuestId = sinon
        .stub(UserArticleLog.prototype, 'getByGuestId')
        .callsFake(() => {
          return {
            _id: '604d63c92959b2806753548f',
            guestId: '03c62141-adc2-454d-8973-e60108606ba3',
            viewedArticles: ['604d5701c476c035ef3ee3ba'],
          };
        });

      const stubCreateOrUpdate = sinon
        .stub(UserArticleLog.prototype, 'createOrUpdate')
        .throws(() => {
          return new Error();
        });

      await userArticleLogController.createUserLog(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith(response);
      expect(stubGetByGuestId.called).to.be.equal(true);
      expect(stubCreateOrUpdate.called).to.be.equal(true);
      stubGetByGuestId.restore();
      stubCreateOrUpdate.restore();
    });
  });

  describe('checkAccess()', () => {
    it('should continue if log count is less than 3', async () => {
      const req = mockRequest({
        params: { id: '604e5b948ee57536d1be7f3e' },
        app: {
          locals: {
            cookieTokens: [{ name: 'guuid', value: '000000000001' }],
            logger: {},
          },
        },
      });

      const res = mockResponse();

      const stubGetByGuestId = sinon
        .stub(UserArticleLog.prototype, 'getByGuestId')
        .callsFake(() => {
          return {
            _id: '604d63c92959b2806753548f',
            guestId: '000000000001',
            viewedArticles: ['604d5701c476c035ef3ee3ba'],
          };
        });

      const nextSpy = sinon.spy();

      await userArticleLogController.checkAccess(req, res, nextSpy);

      expect(nextSpy.called).to.be.equal(true);
      expect(stubGetByGuestId.called).to.be.equal(true);
      stubGetByGuestId.restore();
    });

    it('should continue if no logs available', async () => {
      const req = mockRequest({
        params: { id: '604e5b948ee57536d1be7f3e' },
        app: {
          locals: {
            cookieTokens: [{ name: 'guuid', value: '000000000001' }],
            logger: {},
          },
        },
      });

      const res = mockResponse();

      const stubGetByGuestId = sinon
        .stub(UserArticleLog.prototype, 'getByGuestId')
        .callsFake(() => {
          return null;
        });

      const nextSpy = sinon.spy();

      await userArticleLogController.checkAccess(req, res, nextSpy);

      expect(nextSpy.called).to.be.equal(true);
      expect(stubGetByGuestId.called).to.be.equal(true);
      stubGetByGuestId.restore();
    });
  });

  it('should return 400 if article view count is 3', async () => {
    const req = mockRequest({
      params: { id: '604e5b948ee57536d1be7f3e' },
      app: {
        locals: {
          cookieTokens: [{ name: 'guuid', value: '000000000001' }],
          logger: { error: sinon.stub() },
        },
      },
    });

    const res = mockResponse();

    const stubGetByGuestId = sinon
      .stub(UserArticleLog.prototype, 'getByGuestId')
      .callsFake(() => {
        return {
          _id: '604d63c92959b2806753548f',
          guestId: '000000000001',
          viewedArticles: [
            '604d5701c476c035ef3ee3ba',
            '604d5701c476c035ef3ee3ba',
            '604d5701c476c035ef3ee3ba',
          ],
        };
      });

    const nextSpy = sinon.spy();

    await userArticleLogController.checkAccess(req, res, nextSpy);

    expect(stubGetByGuestId.called).to.be.equal(true);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: 'cannot view more articles',
    });
    stubGetByGuestId.restore();
  });

  it('should return 400 failed if error getting guest logs', async () => {
    const req = mockRequest({
      params: { id: '604e5b948ee57536d1be7f3e' },
      app: {
        locals: {
          cookieTokens: [{ name: 'guuid', value: '000000000001' }],
          logger: { error: sinon.stub() },
        },
      },
    });

    const res = mockResponse();

    const stubGetByGuestId = sinon
      .stub(UserArticleLog.prototype, 'getByGuestId')
      .throws(() => {
        return new Error();
      });

    const nextSpy = sinon.spy();

    await userArticleLogController.checkAccess(req, res, nextSpy);

    expect(stubGetByGuestId.called).to.be.equal(true);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'failed' });
    stubGetByGuestId.restore();
  });
});
