const router = require('express').Router();
const user = require('../models/user');
const professeur = require('../models/professeur');
const groupe = require('../models/groupe');
const seance = require('../models/seance');


// ajouter seance pour chaque user
router.post('/addSeance/:id', async (req, res) => {
    req.body.user = req.params.id;
    const seanceResult = await seance.create(req.body).catch(err => err);
    const userResult = await user.update({ "_id": req.params.id }, { $push: { seances: seanceResult._id } }).exec();
    console.log(userResult)
    res.send({ data: userResult });
    
  })


// get seance by id user 
// router.get('/user/:id', async (req, res) => {
//     const groupeResult = await seance.find({ "user": req.params.id }).populate('user').exec();
//     res.send({ data: seanceResult })
//   })

//add groupe to a prof
router.post('/addGroupe/:id', async (req, res) => {
    req.body.professeur = req.params.id;
    const grpResult = await groupe.create(req.body).catch(err => err);
    const userResult = await professeur.update({ "_id": req.params.id }, { $push: { groupes: grpResult._id } }).exec();
    console.log(userResult)
    res.send({ data: userResult });
    
  })
// get groupe by id prof
router.get('/groupe/:id', async (req, res) => {
    const groupeResult = await groupe.find({ "professeur": req.params.id }).exec();
    res.send({ data: groupeResult })
  })

//get groupe by time
router.get('/groupe/:idS', async (req, res) => {
  var d = new Date()
  if(d.getDay===seance.jour && d.getHours===seance.date_deb && seance.date_fin===(d.getHours+1,5)){
  const groupeResult = await groupe.find({ "seance": req.params.idS }).exec();
  res.send({ data: groupeResult })}
})

//add etudiants dans un groupe de prof
router.post('/addEtudiants/:idgrp/:Id', async (req, res) => {
    req.body.professeur = req.params.Id;
    const etudiantResult = await user.create(req.body).catch(err => err);
    const grpResult2 = await groupe.updateOne({ "_id": req.params.idgrp }, { $push: { etudiants: etudiantResult } }).exec();
    res.send({ data: grpResult2 })
  })


module.exports = router;