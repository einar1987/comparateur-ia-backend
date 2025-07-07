const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route simple de test
app.get('/', (req, res) => {
  res.send('✅ Backend Comparateur IA opérationnel !');
});

// Route test sans Puppeteer
app.get('/test', (req, res) => {
  res.json({ message: '🧪 Test route OK sans Puppeteer' });
});

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
