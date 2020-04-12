const mongoose = require('mongoose');

//absence est un tableau assocoatif
const absence = new mongoose.Schema({
  //nom_matiere: {type:String, required:true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  matiere:{ type: mongoose.Schema.Types.ObjectId, ref: 'matiere' },
  seance: { type: mongoose.Schema.Types.ObjectId, ref: 'seance' },
  justification : String,
})

module.exports = mongoose.model('absence', absence);