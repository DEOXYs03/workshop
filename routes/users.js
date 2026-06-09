var express = require('express');
var router = express.Router();
var userSchema = require('../models/user.model')
const multer = require('multer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenmiddleware = require('../middleware/token.middleware')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })


router.get('/', async function(req, res, next) {

  let users =await userSchema.find({})
  res.send(users);
});


router.post('/',[tokenmiddleware , upload.single('image')], async function(req, res, next) {

  let {name  , password } = req.body

  let user = new userSchema({
    name: name,
    password: await bcrypt.hash(password, 10)
  })
    let token = await jwt.sign({foo:"bar"},"1234")
await user.save()

  res.send(token);
});


router.put('/:id', async function(req, res, next) {

  let {name} = req.body
  let {id} = req.params

  let user = await userSchema.findByIdAndUpdate(id, {name}, {new: true})

  res.send(user);
});

router.delete('/:id', async function(req, res, next) {

  let {id} = req.params

  let user = await userSchema.findByIdAndDelete(id)

  res.send(user);
});
module.exports = router;
