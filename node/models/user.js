const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    //professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'professeur' },
    cin:{type: String,unique: true },
    email: {type: String, unique: true, required: true,match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
    password: {type: String, required: true},
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
  });

  module.exports = mongoose.model('user', UserSchema);