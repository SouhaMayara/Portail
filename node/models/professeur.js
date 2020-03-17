const mongoose = require('mongoose');


const professeur = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

  matieres:[{type: mongoose.Schema.Types.ObjectId, ref: 'matiere' }],
 
  
  //groupes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'groupe'}]
})

module.exports = mongoose.model('professeur', professeur);