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
// get notes by students and matiere

router.get('/:idS/:idm', async (req, res) => {
    req.body.matiere = req.params.idm;
    const noteResult = await note.find({ "user": req.params.idS }).exec();
    res.send({ data: noteResult })
  })

  router.post('/edit/:id',async (req, res) => {
   
    const noteResult = await note.updateOne({ "_id": req.params.id },{ $set: req.body }).exec();
    res.send({ data: noteResult })
  })

  router.post('/delete/:id',async (req, res) => {
   
    const noteResult = await note.deleteOne({ "_id": req.params.id }).exec();
    res.send({ data: noteResult })
  })



module.exports = router;