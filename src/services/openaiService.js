const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeText(text) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: `Analyze this legal document: ${text}` }],
  });
  return response.choices[0].message.content;
}

module.exports = { analyzeText };
