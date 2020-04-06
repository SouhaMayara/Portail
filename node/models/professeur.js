const mongoose = require('mongoose');


const professeur = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
 // matieres:[{type: mongoose.Schema.Types.ObjectId, ref: 'matiere' }],
  seances:[{ type: mongoose.Schema.Types.ObjectId, ref: 'seance'}],
 // groupe: { type: mongoose.Schema.Types.ObjectId, ref: 'groupe' }
})

module.exports = mongoose.model('professeur', professeur);