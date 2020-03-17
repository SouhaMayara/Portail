const router = require('express').Router();
const article = require('../models/article');
const user = require('../models/user');
// const professeur = require('../models/professeur');

router.post('/addArticle', async (req, res) => {
  
  const articleResult = await article.create(req.body).catch(err => err);
  const userResult = await user.updateMany( { $push: { articles: articleResult} }).exec();
  res.send({ data: userResult })
})

router.get('/byRole/:role', async (req, res) => {
    const articleResult = await article.find({ "type": req.params.role }).populate('user').exec();
    res.send({ data: articleResult })
  })

router.get('/byId/:id', async (req, res) => {
    const articleResult = await article.findOne({ "_id": req.params.id }).populate('user').exec();
    res.send({ data: articleResult })
  })

router.get('/articles', async (req, res) => {
    const result = await article.find().exec();
    res.send({ data: result })
  })


module.exports = router;