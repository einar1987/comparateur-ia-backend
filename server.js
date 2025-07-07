const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route test pour vérifier que le backend fonctionne
app.get('/', (req, res) => {
  res.send('✅ Backend Comparateur IA opérationnel !');
});

// Exemple de route avec Puppeteer (test simple pour Render)
app.get('/test', async (req, res) => {
  try {
    const browser = await require('puppeteer').launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();
    res.send(`Titre de la page : ${title}`);
  } catch (err) {
    console.error('Erreur Puppeteer:', err);
    res.status(500).send('Erreur côté serveur avec Puppeteer');
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
