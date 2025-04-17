const express = require('express');
const Coleta = require('../models/ColetaDeOleo');
const autenticar = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', autenticar, async (req, res) => {
  try {
    const nova = new Coleta({ usuario: req.user.id, quantidade: req.body.quantidade });
    await nova.save();
    res.status(201).json({ message: 'Coleta registrada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar coleta' });
  }
});

router.get('/historico', autenticar, async (req, res) => {
  try {
    const historico = await Coleta.find({ usuario: req.user.id }).sort({ data: -1 });
    res.json(historico);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar histórico' });
  }
});

module.exports = router;