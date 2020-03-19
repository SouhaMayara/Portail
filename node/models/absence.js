const mongoose = require('mongoose');

const absence = new mongoose.Schema({
  nom_matiere: String,
  Fullname: {type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  matiere:{ type: mongoose.Schema.Types.ObjectId, ref: 'matiere' },
})

module.exports = mongoose.model('absence', absence);