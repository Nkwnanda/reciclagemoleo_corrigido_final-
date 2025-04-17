const mongoose = require('mongoose');

const coletaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantidade: Number,
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ColetaDeOleo', coletaSchema);