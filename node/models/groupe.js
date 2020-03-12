const mongoose = require('mongoose');

const groupe = new mongoose.Schema({
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
  etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  nomGrp: String
})
module.exports = mongoose.model('groupe', groupe);