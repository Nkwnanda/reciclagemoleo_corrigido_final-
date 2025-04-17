const express = require('express');
const router = express.Router();
const ColetaDeOleo = require('../models/ColetaDeOleo');
const jwt = require('jsonwebtoken');

// Middleware para autenticação
const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, 'seuSegredoJWT', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Rota para obter total de óleo do usuário
router.get('/total', autenticarToken, async (req, res) => {
  try {
    const resultado = await ColetaDeOleo.aggregate([
      { $match: { usuarioId: req.user.id } },
      { $group: { _id: null, total: { $sum: "$quantidade" } } }
    ]);

    const total = resultado[0]?.total || 0;
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao calcular total', erro: err.message });
  }
});

module.exports = router;

