const mongoose = require('mongoose');


const professeur = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  profileImg: String,
  grade: String,
  matieres:[{type: mongoose.Schema.Types.ObjectId, ref: 'matiere' }],
  image: '',
  //groupes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'groupe'}]
})

module.exports = mongoose.model('professeur', professeur);