const express = require('express');
const bodyparser = require('body-parser');
//const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
app.use(bodyparser.json());
app.use('/uploads',express.static('uploads'));
mongoose.connect('mongodb://localhost:27017/absencedb',err =>{
  if(err){
    console.error('___________________Error of connection to database!')
  }else{
    console.log('______________________connected to mongodb')
  }
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const auth = require('./node/routes/auth')
app.use('/auth', auth);

const user = require('./node/routes/userId')
app.use('/user', user);

const article = require('./node/routes/article')
app.use('/article', article);

const seance = require('./node/routes/seance')
app.use('/seance', seance);

const matiere = require('./node/routes/matiere')
app.use('/matiere', matiere);

const note = require('./node/routes/note')
app.use('/note', note);

app.listen(3001, ()=>{
  console.log('________________________port:3001')
})