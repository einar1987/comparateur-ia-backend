const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Backend Comparateur IA opérationnel !');
});

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
