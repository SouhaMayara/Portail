const router = require('express').Router();
const user = require('../models/user');
const groupe = require('../models/groupe');
const matiere = require('../models/matiere');
const professeur = require('../models/professeur');

//add groupe to a prof pour une matiere
router.post('/addGrp/:matiereId/:userId', async (req, res) => {
  req.body.professeur = req.params.userId;
  const groupeResult = await groupe.create(req.body).catch(err => err);
  const matiereResult= await matiere.update({ "_id": req.params.matiereId }, { $push: { groupes: groupeResult } }).exec();
  res.send({ data: matiereResult })
    
  })

// get groupe et ses etudiants by id prof
router.get('/groupe/:id', async (req, res) => {
    const groupeResult = await groupe.find({ "professeur": req.params.id }).exec();
    res.send({ data: groupeResult })
  })



//add etudiants dans un groupe d
router.post('/addEtudiants/:idgrp', async (req, res) => {
  req.body.groupe = req.params.idgrp;
  const etudiantResult = await user.create(req.body).catch(err => err);
  const groupeResult = await groupe.updateOne({ "_id": req.params.idgrp }, { $push: { etudiants: etudiantResult._id } }).exec();
  res.send({ data: groupeResult })
  })


module.exports = router;