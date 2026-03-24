const express = require('express');
const app = express();
app.use(express.json());

let portfolio = [
  { id: 1, name: "Bitcoin", type: "Crypto", units: 0.5, price: 60000 }
];

app.get('/api/assets', (req, res) => {
  res.status(200).json({ status: "OK", data: portfolio });
});

app.post('/api/assets', (req, res) => {
  const newAsset = { id: Date.now(), ...req.body };
  portfolio.push(newAsset);
  res.status(201).json({ status: "OK", message: "Asset added", data: newAsset });
});

app.delete('/api/assets/:id', (req, res) => {
  portfolio = portfolio.filter(a => a.id != req.params.id);
  res.status(200).json({ status: "OK", message: "Asset deleted" });
});

if (require.main === module) {
  app.listen(5000, () => console.log('Server running on port 5000'));
}
module.exports = app;