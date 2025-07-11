// docRoutes.js
// Handles document-related routes like upload, fetch, delete

const express = require('express');
const router = express.Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.send({ message: 'Document route works!' });
});

module.exports = router;
