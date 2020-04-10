const router = require('express').Router();
const user = require('../models/user');
const professeur = require('../models/professeur');

router.get('/Prof/:idUser', async (req, res) => {
  const profResult = await professeur.findOne({ "user": req.params.idUser }).exec();
  res.send({ data: profResult })
})

router.get('/byUser/:id', async (req, res) => {
  const userResult = await user.findOne({ "_id": req.params.id }).exec();
  res.send({ data: userResult })
})



router.post('/updateProfile/:id', async (req, res) => {
    const userResult = await user.update({ "_id": req.params.id }, { $set: req.body }).exec();
    res.send({ data: userResult })
  })
module.exports = router;