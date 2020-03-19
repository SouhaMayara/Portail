const router = require('express').Router();
const user = require('../models/user');
const groupe = require('../models/groupe');
const matiere = require('../models/matiere');
const professeur = require('../models/professeur');
const seance = require('../models/seance');

//add groupe 
router.post('/addGrp', async (req, res) => {
  const groupeResult = await groupe.create(req.body).catch(err => err);
  res.send({ data: groupeResult })
    
  })
//add groupe by prof
router.post('/addGrpProf/:idP', async (req, res) => {
  req.body.professeur = req.params.idP;
  const groupeResult = await groupe.create(req.body).catch(err => err);
  const profResult = await professeur.updateOne({ "_id": req.params.idP }, { $push: { groupes: groupeResult._id } }).exec();
  res.send({ data: profResult })
})
// add seance by groupe 
router.post('/addSeance/:idGrp', async (req, res) => {
    req.body.groupe = req.params.idGrp;
    const seanceResult = await seance.create(req.body).catch(err => err);
    const groupeResult = await groupe.updateOne({ "_id": req.params.idGrp }, { $push: { seances: seanceResult._id } }).exec();
    res.send({ data: groupeResult })
  })


//get seance par groupe
router.get('/byId/:idg', async (req, res) => {
  const seanceResult = await seance.findOne({ "groupe": req.params.idg }).exec();
  res.send({ data: seanceResult })
})

// get groupes by prof
router.get('/groupe/:idp', async (req, res) => {
    const groupeResult = await groupe.find({ "professeur": req.params.idp }).exec();
    res.send({ data: groupeResult })
  })

//get etudiants by groupe
router.get('/etudiants/:idg', async (req, res) => {
  const userResult = await user.find({ "groupe": req.params.idg }).populate("groupe").exec();
  res.send({ data: userResult })
})
//get etudiant in groupe
router.get('/etudiant/:id', async (req, res) => {
  const userResult = await user.find({"_id":req.params.id}).populate({path: 'groupe', populate:{path:'user'}}).exec();
  res.send({ data: userResult })
})

//add etudiants dans un groupe 
router.post('/addEtudiants/:idgrp', async (req, res) => {
  req.body.groupe = req.params.idgrp;
  const etudiantResult = await user.create(req.body).catch(err => err);
  const groupeResult = await groupe.updateOne({ "_id": req.params.idgrp }, { $push: { etudiants: etudiantResult._id } }).populate("groupe").exec();
  res.send({ data: groupeResult })
  })


module.exports = router;