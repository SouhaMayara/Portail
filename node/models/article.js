const mongoose = require('mongoose');

const article = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  title: String,
  topic: String,
  content: String,
  date: { type: String, default: Date.now() },
  image: '',
})
module.exports = mongoose.model('article', article);