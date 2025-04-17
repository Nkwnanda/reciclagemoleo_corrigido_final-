const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email já cadastrado' });

    const hashedSenha = await bcrypt.hash(senha, 10);
    const newUser = new User({ nome, email, senha: hashedSenha });
    await newUser.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, nome: user.nome });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login' });
  }
});

module.exports = router;