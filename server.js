const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// 👉 Mets ici ta propre clé API si tu veux la fixer en dur
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'ta_clé_openai';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('✅ Backend Comparateur IA opérationnel !');
});

app.get('/test', (req, res) => {
  res.json({ message: '✅ Test route OK sans Puppeteer' });
});

app.post('/analyse', async (req, res) => {
  try {
    const { titre, description } = req.body;

    const prompt = `Tu es un expert en comparaison de produits. Analyse ce produit :
    Titre : ${titre}
    Description : ${description}
    
    Donne-moi une recommandation claire :
    1. Si c’est un bon produit ou non
    2. Et propose 3 à 5 alternatives meilleures en prix ou qualité (si possible sur Amazon, Fnac, LDLC ou autre)
    3. Donne des liens directs vers ces produits si possible.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erreur dans l’analyse du produit.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
