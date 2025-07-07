const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON si besoin
app.use(express.json());

// ✅ Route GET de base
app.get('/', (req, res) => {
  res.send('✅ Backend Comparateur IA opérationnel !');
});

// 🔧 Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
