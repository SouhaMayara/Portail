const router = require('express').Router();
const user = require('../models/user');
const professeur = require('../models/professeur');
const groupe = require('../models/groupe');
const matiere = require('../models/matiere');
const absence = require('../models/absence');


//add matiere by professeur id
router.post('/addMatiere/:idp', async (req, res) => {
  req.body.professeur = req.params.idp;
  const matiereResult = await matiere.create(req.body).catch(err => err);
  const profResult = await professeur.updateOne({ "_id": req.params.idp }, { $push:{ matieres: matiereResult._id } }).exec();
  res.send({ data: profResult })
})

//add matiere to etudiant
router.post('/addMatiereEtud/:id', async (req, res) => {
  req.body.user = req.params.id;
  const matiereResult = await matiere.create(req.body).catch(err => err);
  const userResult = await user.update({ "_id": req.params.id }, { $push: { matieres: matiereResult._id } }).exec();
  console.log(matiereResult)
  res.send({ data: userResult });
  
})

//add student by matiere to prof
// router.post('/addStudent/:idm/:id', async (req, res) => {
//   req.body.professeur = req.params.id;
//   const studentResult = await user.create(req.body).catch(err => err);
//   const matiereResult2 = await matiere.update({ "_id": req.params.idm }, { $push: { etudiants: studentResult } }).exec();
//   res.send({ data: matiereResult2 })
// })

//get number of absences by matiere and student
router.get('/absNb/:nom', async (req, res) => {
  const absResult = await absence.countDocuments({ "Fullname": req.params.nom }).populate('absence').exec();
  res.send({ data: absResult })
})



//get matieres et leurs absences par user 
// router.get('/:id', async (req, res) => {
//   const matiereResult = await matiere.find({ "user": req.params.id }).exec();
//   res.send({ data: matiereResult })
//   })

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
  const absenceResult = await absence.deleteOne({ _id: req.params.id }).exec()
  // const delResult = await comments.update({ "_id": ObjectId(req.params.id) }, { $set: { [`articles.${i}`]: req.body } }).exec();
  res.send({ data: absenceResult })
    
})

router.get('group/:idgrp', async (req, res) => {
  const groupeResult = await groupe.findOne({ "_id": req.params.idgrp }).populate("matiere").exec(); 
  console.log(groupeResult);
  res.send({ data: groupeResult})
 })


module.exports = router;