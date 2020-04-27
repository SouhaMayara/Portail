const mongoose = require('mongoose');

//note est un tableau associatif
const note = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  matiere:{ type: mongoose.Schema.Types.ObjectId, ref: 'matiere' },
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
  note: {type:Number, required:true},
  type: { type: String, enum: ['DS', 'Examen','TP'], required:true},
  date:{type:Date, default: new Date()}
})

module.exports = mongoose.model('note', note);