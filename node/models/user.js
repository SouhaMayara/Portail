const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    cin:{type: Number, unique: true },
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    abs:Boolean, 
    role: { type: String, enum: ['professeur', 'Etudiant'], default: 'Etudiant' }
    
  });

  module.exports = mongoose.model('user', UserSchema);