const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    //professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
    cin:{type: Number , unique: true },
    email: {
      type: String,
      min: [5, 'Too short, min is 5 characters'],
      max: [32, 'Too long, max is 32 characters'],
      unique: true,
      lowercase: true,
      required: 'Email is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
      },
    firstname: {type: String},
    lastname: {type: String},
    //abs:{ type:Boolean , default:'false'}, 
    role: { type: String, enum: ['professeur', 'Etudiant'], default: 'Etudiant' },
   // articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'article' }],
   // matieres:[{type: mongoose.Schema.Types.ObjectId, ref: 'matiere' }],
    //notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'note' }],
    image:{type: String, required:true},
    grade: String,
    groupe: {type: mongoose.Schema.Types.ObjectId, ref: 'groupe' },
    password: {
      type: String,
      min: [5, 'Too short, min is 5 characters'],
      max: [32, 'Too long, max is 32 characters'],
      required: 'Password is required'
      },
      });
    
  module.exports = mongoose.model('user', UserSchema);