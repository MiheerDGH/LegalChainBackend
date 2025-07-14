
const { supabase } = require('../config/supabaseClient');
const { PrimsaClient } = require('@prisma/client'); // adjust if needed
const prisma = new PrismaClient;
const { v4: uuidv4 } = require('uuid');

// POST /api/docs/upload
exports.uploadDocument = async (req, res) => {
  const file = req.file;
  const userId = req.user.id; // assuming auth middleware sets req.user

  if (!file) return res.status(400).json({ message: 'No file uploaded.' });

  const fileName = `${uuidv4()}-${file.originalname}`;

  const { data, error } = await supabase
    .storage
    .from('documents') // your bucket name
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) return res.status(500).json({ message: 'Supabase upload error', error });

  const publicUrl = `https://twtsapuvlpcxedudgzao/storage/v1/object/public/documents/${fileName}`;

  const doc = await prisma.document.create({
    data: {
      userId,
      fileName,
      url: publicUrl,
    },
  });

  res.status(201).json(doc);
};

// GET /api/docs
exports.getDocuments = async (req, res) => {
  const userId = req.user.id;

  const docs = await prisma.document.findMany({ where: { userId } });
  res.json(docs);
};

// DELETE /api/docs/delete/:id
exports.deleteDocument = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc || doc.userId !== userId) return res.status(404).json({ message: 'Not found or unauthorized.' });

  await supabase.storage.from('documents').remove([doc.fileName]);

  await prisma.document.delete({ where: { id } });

  res.json({ message: 'Document deleted.' });
};
