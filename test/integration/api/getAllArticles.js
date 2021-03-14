const request = require('supertest');
const { expect } = require('chai');

describe('Route: GET /api/articles/', () => {
  const app = require('../../../src');
  let response;

  before(async () => {
    response = await request(app).get('/api/articles');
  });

  it('should return 200 on success', async () => {
    expect(response.status).to.equal(200);
  });
});
