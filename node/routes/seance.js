const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const groupe = require('../models/groupe');
const matiere = require('../models/matiere');
const professeur = require('../models/professeur');
const seance = require('../models/seance');


//add  seance by groupe , prof and matiere
router.post('/addSeanceGrp/:idG/:idM/:id', async (req, res) => {
  req.body.professeur = req.params.id;
  req.body.groupe = req.params.idG;
  req.body.matiere = req.params.idM;
  const seanceResult = await seance.create(req.body).catch(err => err);
  const grpResult = await groupe.updateOne({ "_id": req.params.idG }, { $push: { seances: seanceResult._id } }).exec();
  const matiereResult = await matiere.updateOne({ "_id": req.params.idM }, { $push: { seances: seanceResult._id } }).exec();
  const profResult = await professeur.updateOne({ "_id": req.params.id }, { $push: { seances: seanceResult._id } }).exec();
  res.send({ data: grpResult, matiereResult, profResult})
})


//add groupe 
router.post('/addGrp', async (req, res) => {
  const groupeResult = await groupe.create(req.body).catch(err => err);
  res.send({ data: groupeResult })
    
  })


//get seances par groupe api pour emploi des etudiants
// from this api you can find also the information of "matiere","prof","groupe" for each "seance"
router.get('/byId/:idg', async (req, res) => {
  const seanceResult = await seance.find({ "groupe": req.params.idg }).populate('matiere').populate({ path: 'professeur', populate: { path: 'user' } }).populate('groupe').exec();
  res.send({ data: seanceResult })
})

// get seance by prof pour emploi prof
// from this api you can find also the information of "matiere","groupe" for each "seance"
router.get('/seances/:idp', async (req, res) => {
    const seanceResult = await seance.find({ "professeur": req.params.idp }).populate('matiere').populate('groupe').exec();
    res.send({ data: seanceResult })
  })

// get les etudiants d'un groupe pendant une certaine seance pour un prof 
router.get('/seance/:idS/:id', async (req, res) => {
  req.body.professeur = req.params.id;
  const seanceResult = await seance.find({ "_id": req.params.idS }).populate({ path: 'groupe', populate: { path: 'etudiants' } }).exec();
  res.send({ data: seanceResult })
})


//get etudiant in groupe
router.get('/etudiant/:id', async (req, res) => {
  const userResult = await user.find({"_id":req.params.id}).populate({path: 'groupe', populate:{path:'user'}}).exec();
  res.send({ data: userResult })
})

//add etudiants dans un groupe 
router.post('/addEtudiants/:idgrp', async (req, res) => {
  req.body.groupe = req.params.idgrp;
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const userResult = await user.create(req.body).catch(err => err);
  const grpResult = await groupe.updateOne({ "_id": req.params.idgrp }, { $push: { etudiants: userResult._id } }).exec();
  console.log(req.body);
  res.send({data : grpResult });
})

//add groupe by prof
// router.post('/addGrpProf/:idP', async (req, res) => {
//   req.body.professeur = req.params.idP;
//   const groupeResult = await groupe.create(req.body).catch(err => err);
//   const profResult = await professeur.updateOne({ "_id": req.params.idP }, { $push: { groupes: groupeResult._id } }).exec();
//   res.send({ data: profResult })
// })
// add seance by groupe 
// router.post('/addSeance/:idGrp', async (req, res) => {
//     req.body.groupe = req.params.idGrp;
//     const seanceResult = await seance.create(req.body).catch(err => err);
//     const groupeResult = await groupe.updateOne({ "_id": req.params.idGrp }, { $push: { seances: seanceResult._id } }).exec();
//     res.send({ data: groupeResult })
//   })

//get etudiants by groupe 
// router.get('/etudiants/:idg', async (req, res) => {
//   const userResult = await user.find({ "groupe": req.params.idg }).exec();
//   res.send({ data: userResult })
// })

module.exports = router;