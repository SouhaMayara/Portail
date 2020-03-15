const mongoose = require('mongoose');

const groupe = new mongoose.Schema({
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
  matiere:{ type: mongoose.Schema.Types.ObjectId, ref: 'matiere'},
  nomGrp: String,
  nom_seance: String,
  nom_matiere:String,
  duree: String,
  jour:{ type: Date},
  date_deb:{ type: Date },
  date_fin: {type: Date },
  etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
 

})
module.exports = mongoose.model('groupe', groupe);