const router = require('express').Router();
const user = require('../models/user');
const professeur = require('../models/professeur');
const groupe = require('../models/groupe');
const matiere = require('../models/matiere');
const absence = require('../models/absence');
const seance = require('../models/seance');
const note = require('../models/note');


//add note in matiere to student by prof

router.post('/addNote/:idSt/:idM/:id', async (req, res) => {
    req.body.user = req.params.idSt;
    req.body.matiere = req.params.idM;
    req.body.professeur = req.params.id;
    const noteResult = await note.create(req.body).catch(err => err);
    res.send({ data:noteResult })
})

router.post('/addNotes/:idSt/:idM/:id/:note/:type', async (req, res) => {
  req.body.user = req.params.idSt;
  req.body.matiere = req.params.idM;
  req.body.professeur = req.params.id;
  req.body.note = req.params.note;
  req.body.type = req.params.type;
  const noteResult = await note.create(req.body).catch(err => err);
  res.send({ data:noteResult })
})
// get notes by students and matiere

router.get('/:idS/:idm', async (req, res) => {
    req.body.matiere = req.params.idm;
    const noteResult = await note.find({ "user": req.params.idS }).exec();
    res.send({ data: noteResult })
  })
  router.get('/:idS/:idm/:type', async (req, res) => {
    const noteResult = await note.findOne({ "user": req.params.idS, "matiere": req.params.idm, "type" : req.params.type }).exec();
    res.send({ data: noteResult })
  })

  router.post('/edit/:id',async (req, res) => {
   
    const noteResult = await note.updateOne({ "_id": req.params.id },{ $set: req.body }).exec();
    res.send({ data: noteResult })
    console.log("hhhhhhhhhhhh")
    console.log(req.body)
  })

  router.post('/delete/:id',async (req, res) => {
   
    const noteResult = await note.deleteOne({ "_id": req.params.id }).exec();
    res.send({ data: noteResult })
  })

  router.get('/:id', async (req, res) => {
  
    const userResult = await note.findOne({ "_id": req.params.id }).exec();
    res.send({ data: userResult })
  })

module.exports = router;