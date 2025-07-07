const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // NE PAS METTRE DE CLÉ DIRECTEMENT ICI
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('✅ Backend Comparateur IA opérationnel !');
});

app.get('/test', (req, res) => {
  res.json({ message: '✅ Test route OK' });
});

app.post('/analyse', async (req, res) => {
  try {
    const { title, price } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: "Tu es un expert en comparateurs de prix et recommandations d’achat.",
        },
        {
          role: 'user',
          content: `Voici le produit : "${title}" vendu à ${price} €. Peux-tu me proposer 3 à 5 alternatives similaires, plus qualitatives ou moins chères, disponibles en ligne ou sur Amazon ? Donne-moi uniquement des produits concrets avec nom, arguments et lien si possible.`,
        },
      ],
    });

    const answer = completion.choices[0].message.content;
    res.json({ response: answer });
  } catch (error) {
    console.error('Erreur GPT:', error);
    res.status(500).json({ error: 'Erreur lors de l’analyse avec ChatGPT.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
