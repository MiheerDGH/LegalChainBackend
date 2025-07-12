// docRoutes.js
// Handles document-related routes like upload, fetch, delete

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadDocument, getDocuments, deleteDocument } = require('../controllers/docController');

// basic multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/', getDocuments);
router.delete('/delete/:id', deleteDocument);

module.exports = router;
