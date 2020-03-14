const mongoose = require('mongoose');

const matiere = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  nom: String,
  duree: String,
  coef: Number
})
module.exports = mongoose.model('matiere', matiere);