const router = require('express').Router();
const article = require('../models/article');
const user = require('../models/user');
// const professeur = require('../models/professeur');

router.post('/addArticle/:idUser', async (req, res) => {
  req.body.user = req.params.idUser;
  const articleResult = await article.create(req.body).catch(err => err);
  const userResult = await user.updateOne({ "_id": req.params.idUser }, { $push: { articles: articleResult._id } }).exec();
  res.send({ data: userResult })
})

router.get('/byUser/:id', async (req, res) => {
    const articleResult = await article.find({ "user": req.params.id }).populate('user').exec();
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