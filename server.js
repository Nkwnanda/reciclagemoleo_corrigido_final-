const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('Erro MongoDB:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/coleta', require('./routes/coleta'));

app.get('/', (req, res) => res.send('API do Projeto de Reciclagem de Óleo'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));