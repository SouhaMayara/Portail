const router = require('express').Router();
const user = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const professeur = require('../models/professeur');


router.post('/login', async (req, res) => {
  const userResult = await user.findOne({ email: req.body.email }).exec();
  if (!userResult) res.send({ message: 'Wrong email or password ' })
  // console.log(userResult.password)
  if (!bcrypt.compareSync(req.body.password, userResult.password)) res.send({ message: 'Wrong email or password' })
  res.send({ message: 'ok', token: jwt.sign({ data: userResult }, ' secret_pass ') })
})

router.post('/register', async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const userResult = await user.create(req.body).catch(err => err);
  console.log(req.body)
  if (req.body.role === 'professeur') {
    req.body.user = userResult._id;
    console.log(req.body)
    const profResult = await professeur.create(req.body).catch(err => err);
    const userResult2 = await user.updateOne({_id:userResult._id}, {$set: {professeur: profResult._id}})
    console.log(profResult, userResult2)

  }
  res.send({ message: 'ok', data: userResult });
})

router.get('/all', async (req,res )=> {
  const userResult = await user.find().exec()
  res.send({userResult})
})

module.exports = router;