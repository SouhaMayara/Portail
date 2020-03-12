const mongoose = require('mongoose');

const seance = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  nom: String,
  nom_matiere:String,
  duree: String,
  date_deb: String,
  date_fin: String
})
module.exports = mongoose.model('seance', seance);