const router = require('express').Router()
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const professeur = require('../models/professeur')
const multer=require('multer');

const storage =multer.diskStorage({
  destination: function(req,file,cb){
    cb (null , './uploads');
  },
  filename:function(req,file,cb){
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  }
});

const fileFilter =(req,file,cb)=>{
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
    cb(null,true);
  }
  else{
    cb(null,false);}
  
  
};
const upload=multer ({storage:storage,
  limits:{
  fileSize:1024* 1024 *5
},
fileFilter:fileFilter
});

router.post('/login', async (req, res) => {
  const userResult = await user.findOne({ email: req.body.email }).exec();
  if (!userResult) res.send({ message: 'Wrong email or password ' })
  // console.log(userResult.password)
  if (!bcrypt.compareSync(req.body.password, userResult.password)) res.send({ message: 'Wrong email or password' })
  res.send({ message: 'ok' , token: jwt.sign({ data: userResult }, ' secret_pass ') })
})

router.post('/register',upload.single('image') ,async (req, res) => {
  req.body.image=req.file.path;
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const userResult = await user.create(req.body).catch(err => err);
  console.log(req.body);
  console.log(req.file);
  if (req.body.role === 'professeur') {
    req.body.user = userResult._id;
    console.log(req.body)
    const profResult = await professeur.create(req.body).catch(err => err);
    const userResult2 = await user.updateOne({_id:userResult._id},{$set: {professeur: profResult._id}})
    console.log(profResult, userResult2)

  }
  res.send({ message: 'ok', data: userResult });
})

router.get('/all',upload.single('image') , async (req,res )=> {
  req.body.image=req.file.path;
  const userResult = await user.find().exec();
  res.send({userResult})
})

module.exports = router;