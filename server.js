const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai'); // ✅ Corrigé ici

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Nouvelle initialisation avec OpenAI v4 SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/analyse', async (req, res) => {
  const { title, price, brand, url } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  const prompt = `
Tu es un comparateur de produits intelligent.
Voici un produit trouvé en ligne :

Titre : ${title}
Prix : ${price}
Marque : ${brand}
Lien : ${url}

Ta mission :
1. Évalue le rapport qualité/prix.
2. Commente la fiabilité de la marque si tu la connais.
3. Propose 3 à 5 alternatives similaires, en mieux ou moins cher, sur Amazon, Fnac, LDLC, etc.
4. Termine par une recommandation globale.

Langue : français.
Style : concis, utile, neutre.
`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    });

    const result = chatCompletion.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error('Erreur GPT :', error);
    res.status(500).json({ error: 'Erreur lors de l’appel à GPT' });
  }
});

app.listen(port, () => {
  console.log(`✅ Serveur backend IA actif sur le port ${port}`);
});
