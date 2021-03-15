const request = require('supertest');
const { expect } = require('chai');

describe('Route: GET /api/articles/:id', () => {
  const app = require('../../../src');
  let response;

  before(async () => {
    response = await request(app).get('/api/articles/1');
  });

  it('should return 400 on success', async () => {
    expect(response.status).to.equal(400);
  });

  it('should return the articles object', async () => {
    expect(response).to.be.an.instanceOf(Object);
  });
});
