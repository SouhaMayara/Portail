const mongoose = require('mongoose');


const matiere = new mongoose.Schema({
  professeur:{type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ref: {type:String, required:true },
  nom: String,
  duree: String,
  coef: Number,
  jour:{ type: Date},
  date_deb:{ type: Date },
  date_fin: {type: Date },
  groupe: { type: mongoose.Schema.Types.ObjectId, ref: 'groupe' },
  etudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  groupes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groupe' }],
  absences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'absence' }],
})
// matiere.methods.calculAbs = function() {
//   if(user.abs==true){
//   return nbAbs++;
//   }
// };
module.exports = mongoose.model('matiere', matiere);