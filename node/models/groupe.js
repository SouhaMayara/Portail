const mongoose = require('mongoose');

const groupe = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  professeurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'professeur' }],
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
  matiere:[{ type: mongoose.Schema.Types.ObjectId, ref: 'matiere'}],
  etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  nom:String,
  jour: Date,
  dateDeb:Date,
  dateFin:Date,
  seances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'seance' }],
 
})
module.exports = mongoose.model('groupe', groupe);