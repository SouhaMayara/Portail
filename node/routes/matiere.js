const router = require('express').Router();
const user = require('../models/user');
const professeur = require('../models/professeur');
const groupe = require('../models/groupe');
const matiere = require('../models/matiere');
const absence = require('../models/absence');


//add matiere
// router.post('/addMatiere/', async (req, res) => {
//   req.body.professeur = req.params.idp;
//   const matiereResult = await matiere.create(req.body).catch(err => err);
//   const profResult = await professeur.updateOne({ "_id": req.params.idp }, { $push:{ matieres: matiereResult._id } }).exec();
//   res.send({ data: profResult })
// })

//add matiere to etudiant
router.post('/addMatiere', async (req, res) => {
  const matiereResult = await matiere.create(req.body).catch(err => err);
  const userResult = await user.updateMany( { $push: { matieres: matiereResult._id } }).exec();
  console.log(matiereResult)
  res.send({ data: userResult });
  
})

//add matiere by prof
router.post('/addMatiereProf/:idP', async (req, res) => {
  req.body.professeur = req.params.idP;
  const matiereResult = await matiere.create(req.body).catch(err => err);
  const profResult = await professeur.updateOne({ "_id": req.params.idP }, { $push: { matieres: matiereResult._id } }).exec();
  console.log(matiereResult)
  res.send({ data: profResult })
})

//get matiere by prof
router.get('/:idP', async (req, res) => {
  const matiereResult = await matiere.find({ "professeur": req.params.idP }).exec();
  res.send({ data: matiereResult })
})

//add matiere by groupe
router.post('/addMatiere/:idGrp', async (req, res) => {
  req.body.groupe = req.params.idGrp;
  const matiereResult = await matiere.create(req.body).catch(err => err);
  const groupeResult = await groupe.updateOne({ "_id": req.params.idGrp }, { $push: { matiere: matiereResult._id } }).exec();
  res.send({ data: groupeResult })
})

// add matiere by etudiant
router.post('/addMatiereEtudiant/:id', async (req, res) => {
  req.body.user = req.params.id;
  const matiereResult = await matiere.create(req.body).catch(err => err);
  const userResult = await user.updateOne({ "_id": req.params.id }, { $push: { matieres: matiereResult._id } }).exec();
  res.send({ data: userResult })
})

//get matieres by etudiant
// router.get('/:idE', async (req, res) => {
//   const matiereResult = await matiere.find({ "user": req.params.idE }).ppopulate("user").exec();
//   res.send({ data: matiereResult })
// })
//get number of absences by matiere and student
router.get('/absNb/:id/:nom', async (req, res) => {
  //const matiereResult = await matiere.find({"nom_matiere" : req.params.nom}).populate('user').exec();
  const absResult = await absence.find({"nom_matiere" : req.params.nom}).populate('user').exec();
 const absResult1 = await absence.countDocuments({ "user":req.params.id ,"nom_matiere": req.params.nom }).exec();
  res.send({ data: absResult1 ,info:absResult})
})

//get matiere by name
router.get('/getBy/:name', async (req, res) => {
  const matiereResult = await matiere.findOne({ "nom": req.params.name}).exec();
  res.send({ data: matiereResult })
})



//add absence by matiere to etudiants
router.post('/addAbs/:idm/:id', async (req, res) => {
  req.body.user = req.params.id;
  const absResult = await absence.create(req.body).catch(err => err);
  const matiereResult2 = await matiere.update({ "_id": req.params.idm }, { $push: { absences: absResult } }).exec();
  res.send({ data: matiereResult2 })
})

//delete absence
router.post('/deleteAbs/:id', async (req, res) => {
  const matiereResult = await matiere.findOne({ absences: req.params.id }).exec()
  const matiereUpdateResult = await matiere.updateOne({ _id: matiereResult._id },
    { $pull: { absences: req.params.id } }).exec()
  const absenceResult = await absence.deleteOne({ "_id": req.params.id }).exec()
  // const delResult = await comments.update({ "_id": ObjectId(req.params.id) }, { $set: { [`articles.${i}`]: req.body } }).exec();
  res.send({ data: absenceResult })
    
})
//get matieres by user
router.get('/matieres/:idU', async (req, res) => {
  const matiereResult = await matiere.find({ "user": req.params.idU}).exec(); 
 // console.log(groupeResult);
  res.send({ data: matiereResult})
 })

//get matiere by groupeId
router.get('/mat/:idgrp', async (req, res) => {
  const matiereResult = await matiere.find({ "groupe": req.params.idgrp }).exec(); 
 // console.log(groupeResult);
  res.send({ data: matiereResult})
 })


module.exports = router;