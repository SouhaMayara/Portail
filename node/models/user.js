const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

const UserSchema = new mongoose.Schema({
    cin:{type: Number },
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    role: { type: String, enum: ['professeur', 'Etudiant'], default: '' }
    
  });

  const ProfSchema = extendSchema(UserSchema, {
    Grade: {type: String, required: true}
  });

  const EtudiantSchema = extendSchema(UserSchema, {
    Groupe: {type: String, required: true}
  });

  module.exports = mongoose.model('user', UserSchema);