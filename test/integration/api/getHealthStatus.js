const request = require('supertest');
const { expect } = require('chai');

describe('Route: GET /api/health/', () => {
  const app = require('../../../src');
  let response;

  before(async () => {
    response = await request(app).get('/api/health');
  });

  it('should return 200 on success', async () => {
    expect(response.status).to.equal(200);
  });

  it('should return the articles object', async () => {
    expect(response).to.be.an.instanceOf(Object);
  });
});
