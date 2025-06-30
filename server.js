const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const loadData = (file) => {
  const p = path.join(__dirname, 'data', file);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p));
};

const saveData = (file, data) => {
  const p = path.join(__dirname, 'data', file);
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
};

// Akun endpoints
app.get('/api/akun', (req, res) => {
  res.json(loadData('akun.json'));
});

app.post('/api/akun', (req, res) => {
  const akun = loadData('akun.json');
  akun.push({ ...req.body, createdAt: new Date().toISOString() });
  saveData('akun.json', akun);
  res.status(201).json({ status: 'ok' });
});

// Curhat endpoints
app.get('/api/curhat', (req, res) => {
  res.json(loadData('curhat.json'));
});

app.post('/api/curhat', (req, res) => {
  const curhat = loadData('curhat.json');
  curhat.push({ ...req.body, createdAt: new Date().toISOString() });
  saveData('curhat.json', curhat);
  res.status(201).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});