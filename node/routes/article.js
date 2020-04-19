const router = require('express').Router();
const article = require('../models/article');
const user = require('../models/user');
// const professeur = require('../models/professeur');
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

router.post('/addArticle',upload.single('image'), async (req, res) => {
  req.body.image=req.file.path;
  const articleResult = await article.create(req.body).catch(err => err);
  const userResult = await user.updateMany( { $push: { articles: articleResult} }).exec();
  res.send({ data: userResult })
})

router.get('/byRole/:role', async (req, res) => {
    const articleResult = await article.find({ "type": req.params.role }).populate('user').exec();
    res.send({ data: articleResult })
  })

router.get('/byId/:id',async (req, res) => {
    const articleResult = await article.findOne({ "_id": req.params.id }).populate('user').exec();
    res.send({ data: articleResult })
  })

router.get('/articles', upload.single('image'),async (req, res) => {
    const result = await article.find().exec();
    res.send({ data: result })
  })


module.exports = router;