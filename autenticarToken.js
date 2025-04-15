const express = require('express');
const router = express.Router();
const Coleta = require('../models/ColetaDeOleo');
const autenticarToken = require('../middleware/authMiddleware');

// Registrar coleta (autenticado)
router.post('/register', autenticarToken, async (req, res) => {
  try {
    const novaColeta = new Coleta({
      usuario: req.user.id,
      quantidade: req.body.quantidade
    });

    await novaColeta.save();
    res.status(201).json({ message: 'Coleta registrada com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar coleta', error: err.message });
  }
});

// Listar histórico do usuário autenticado
router.get('/historico', autenticarToken, async (req, res) => {
  try {
    const coleta = await Coleta.find({ usuario: req.user.id }).sort({ data: -1 });
    res.json(coleta);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico', error: err.message });
  }
});

module.exports = router;
