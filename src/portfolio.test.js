const request = require('supertest');
const app = require('./app');

describe('Investment Portfolio API - Comprehensive Tests', () => {
  
  // 1. Test GET All Assets
  it('should return all investment assets correctly', async () => {
    const res = await request(app).get('/api/assets');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(Array.isArray(res.body.data)).toBe(true);
    // Cek apakah data default (Bitcoin) ada
    expect(res.body.data[0].name).toBe('Bitcoin');
  });

  // 2. Test POST (Add New Asset)
  it('should add a new asset to the portfolio', async () => {
    const newAsset = {
      name: "Ethereum",
      type: "Crypto",
      units: 2,
      price: 3500
    };

    const res = await request(app)
      .post('/api/assets')
      .send(newAsset);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Asset added');
    expect(res.body.data.name).toBe('Ethereum');
    
    // Verifikasi apakah jumlah aset bertambah
    const checkRes = await request(app).get('/api/assets');
    expect(checkRes.body.data.length).toBe(2);
  });

  // 3. Test DELETE (Remove Asset)
  it('should delete an asset by its ID', async () => {
    // Kita hapus aset Bitcoin yang ID-nya adalah 1
    const res = await request(app).delete('/api/assets/1');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Asset deleted');

    // Verifikasi apakah ID 1 sudah benar-benar hilang
    const checkRes = await request(app).get('/api/assets');
    const findDeleted = checkRes.body.data.find(a => a.id === 1);
    expect(findDeleted).toBeUndefined();
  });
});