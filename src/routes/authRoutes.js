// authRoutes.js
// Handles user authentication routes (login, signup, etc.)

const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

// Public route
router.get('/public', (req, res) => {
  res.json({ msg: 'Anyone can access this' });
});

// Protected route (any logged-in user)
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: `Hello ${req.user.email}` });
});

// Admin-only route
router.get('/admin', authMiddleware, requireRole(['admin']), (req, res) => {
  res.json({ msg: 'Hello Admin' });
});

module.exports = router;
