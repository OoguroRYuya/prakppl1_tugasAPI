const request = require('supertest');
const app = require('./app');

describe('Investment API Tests', () => {
  it('should get assets', async () => {
    const res = await request(app).get('/api/assets');
    expect(res.statusCode).toBe(200);
  });
});