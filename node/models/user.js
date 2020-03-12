const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    cin:{type: Number, unique: true },
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    abs:Boolean, 
    professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
    role: { type: String, enum: ['professeur', 'Etudiant'], default: 'Etudiant' },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'article' }],
    matieres:[{ type: mongoose.Schema.Types.ObjectId, ref: 'matiere' }],
   
  });

  module.exports = mongoose.model('user', UserSchema);