
const express = require('express');
const router = express.Router();
const Coleta = require('../models/ColetaDeOleo');
const autenticarToken = require('../middleware/authMiddleware');

// Registrar coleta (autenticado)
router.post('/register', autenticarToken, async (req, res) => {
  try {
    console.log("📩 Requisição recebida para registrar coleta:");
    console.log("Token ID:", req.user.id);
    console.log("Quantidade:", req.body.quantidade);

    const novaColeta = new Coleta({
      usuarioId: req.user.id,
      quantidade: req.body.quantidade
    });

    await novaColeta.save();
    res.status(201).json({ message: 'Coleta registrada com sucesso!' });
  } catch (err) {
    console.error("❌ Erro ao registrar coleta:", err.message);
    res.status(500).json({ message: 'Erro ao registrar coleta', error: err.message });
  }
});

// Total de óleo reciclado pelo usuário autenticado
router.get('/total', autenticarToken, async (req, res) => {
  try {
    const coletas = await Coleta.find({ usuarioId: req.user.id });
    const total = coletas.reduce((soma, item) => soma + item.quantidade, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao calcular total', error: err.message });
  }
});

module.exports = router;
