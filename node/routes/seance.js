const router = require('express').Router();
const user = require('../models/user');
const professeur = require('../models/professeur');
const groupe = require('../models/groupe');
const seance = require('../models/seance');

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



//add etudiants dans un groupe de prof
router.post('/addEtudiants/:idgrp/:Id', async (req, res) => {
    req.body.professeur = req.params.Id;
    const etudiantResult = await user.create(req.body).catch(err => err);
    const grpResult2 = await groupe.updateOne({ "_id": req.params.idgrp }, { $push: { etudiants: etudiantResult } }).exec();
    res.send({ data: grpResult2 })
  })


module.exports = router;