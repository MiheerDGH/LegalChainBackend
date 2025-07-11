// aiRoutes.js
// Routes that send text or documents to OpenAI and return analysis results

const express = require('express');
const router = express.Router();

// Temporary placeholder route to test the endpoint
router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    // Dummy response (replace later with real OpenAI call)
    res.json({ summary: `This would analyze: ${text}` });
  } catch (err) {
    console.error('AI analysis failed:', err);
    res.status(500).json({ error: 'AI analysis failed' });
  }
});

module.exports = router;
