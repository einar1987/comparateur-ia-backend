app.post('/analyse', express.json(), async (req, res) => {
  const { title, price } = req.body;

  const { OpenAI } = require("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es un expert comparateur IA. Donne 3 à 5 alternatives de meilleure qualité ou prix à ce produit, avec lien et prix si possible.",
        },
        {
          role: "user",
          content: `Produit : ${title}, Prix : ${price}`,
        }
      ]
    });

    const responseText = completion.choices[0].message.content;
    const alternatives = responseText.split('\n').filter(Boolean).map(txt => ({
      title: txt,
      price: "Inconnu",
      link: "#"
    }));

    res.json({ alternatives });
  } catch (err) {
    res.status(500).json({ error: 'Erreur GPT', details: err.message });
  }
});
