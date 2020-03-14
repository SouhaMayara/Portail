const router = require('express').Router();
const user = require('../models/user');
//const groupe = require('../models/groupe');
const matiere = require('../models/matiere');

router.post('/addMatiere/:id', async (req, res) => {
    req.body.user = req.params.id;
    const matiereResult = await matiere.create(req.body).catch(err => err);
    const userResult = await user.update({ "_id": req.params.id },{ $push: { matieres: matiereResult._id } }).exec();
    res.send({ data: userResult });
    
  })
//get matieres par user 
router.get('/user/:id', async (req, res) => {
    const matiereResult = await matiere.find({ "user": req.params.id }).populate('user').exec();
    res.send({ data: matiereResult })
  })
module.exports = router;