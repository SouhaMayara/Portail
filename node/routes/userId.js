const router = require('express').Router();
const user = require('../models/user');
const professeur = require('../models/professeur');
const multer=require('multer');
const bcrypt = require('bcryptjs');

const storage =multer.diskStorage({
  destination: function(req,file,cb){
    cb (null , './uploads');
  },
  filename:function(req,file,cb){
    cb(null, file.originalname);
  }
});
const upload=multer ({storage:storage});

router.get('/Prof/:idUser', async (req, res) => {
  const profResult = await professeur.findOne({ "user": req.params.idUser }).exec();
  res.send({ data: profResult })
})

router.get('/byUser/:id',upload.single('image'), async (req, res) => {
  
  const userResult = await user.findOne({ "_id": req.params.id }).exec();
  res.send({ data: userResult })
})



router.post('/updateProfileImage/:id',upload.single('image'), async (req, res) => {
    req.body.image=req.file.path;
    const userResult = await user.update({ "_id": req.params.id },{ $set: req.body }).exec();
    res.send({ data: userResult })
  })

  router.post('/updateProfile/:id',async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const userResult = await user.update({ "_id": req.params.id },{ $set: req.body }).exec();
    res.send({ data: userResult })
  })


router.get('/Prof/:idUser', async (req, res) => {
  const profResult = await professeur.findOne({ "user": req.params.idUser }).exec();
  res.send({ data: profResult })
})  
module.exports = router;