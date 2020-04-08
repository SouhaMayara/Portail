const mongoose = require('mongoose');

const matiere = new mongoose.Schema({
  professeur:{type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ref: {type:String, required:true },
  nom: String,
  duree: String,
  coef: Number,
  nbreHeures:Number, 
  seances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'seance' }],
  // jour:{ type: Date},
  // date_deb:{ type: Date },
  // date_fin: {type: Date },
  //filiere: { type: String, enum: ['FIA1', 'FIA2','FIA3'], required:true },
  // etudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  //notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'note' }],
  //groupe: { type: mongoose.Schema.Types.ObjectId, ref: 'groupe' },
  //absences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'absence' }],
})

module.exports = mongoose.model('matiere', matiere);