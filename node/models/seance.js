const mongoose = require('mongoose');
const seance = new mongoose.Schema({
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
  nom_matiere:String,
  nomProf:String,
  duree: String,
  jour: String,
  DateFin: Date,
  rattrap:{type: String, enum: ['catching up','regular'], defaut:'regular'},
  nom: { type: String, enum: ['S1', 'S2','S3','S4','S5','S6'], required:true },
  type: { type: String, enum: ['Course', 'TD','TP'], required:true },
  groupe:{ type: mongoose.Schema.Types.ObjectId, ref: 'groupe' },
  matiere:{ type: mongoose.Schema.Types.ObjectId, ref: 'matiere' },

})
module.exports = mongoose.model('seance', seance);