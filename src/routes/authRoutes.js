// authRoutes.js
// Handles user authentication routes (login, signup, etc.)

const express = require('express');
const router = express.Router();
const {analyzeDocument}=require('../controllers/aiController'); 
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/analyze', authMiddleware, analyzeDocument); 

module.exports = router;
