require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
const coletaRoutes = require('./routes/coleta');

app.use('/api/auth', authRoutes);         // ex: /api/auth/login
app.use('/api/coleta', coletaRoutes);    // ex: /api/coleta/historico

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });
