const mongoose = require('mongoose');

const absence = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'matiere' },
  seance: String,
  justifie:Boolean
})
module.exports = mongoose.model('absence', absence);