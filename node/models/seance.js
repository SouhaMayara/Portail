const mongoose = require('mongoose');

const seance = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  nom_matiere:String,
  nomProf:String,
  duree: String,
  jour: Date,
  nom: { type: String, enum: ['S1', 'S2','S3','S4','S5','S6'], required:true },
  groupe:{ type: mongoose.Schema.Types.ObjectId, ref: 'groupe' },
})
module.exports = mongoose.model('seance', seance);