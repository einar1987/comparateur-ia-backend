const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

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

Réponse :
`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    });

    const result = completion.data.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error('Erreur GPT:', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'appel à GPT' });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend IA comparateur en ligne sur le port ${port}`);
});
