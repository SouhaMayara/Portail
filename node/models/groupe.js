const mongoose = require('mongoose');

const groupe = new mongoose.Schema({
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
  etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  nomGrp: String,
  nom_seance: String,
  nom_matiere:String,
  duree: String,
  jour: Date,
  date_deb: Date,
  date_fin: Date,
})
module.exports = mongoose.model('groupe', groupe);