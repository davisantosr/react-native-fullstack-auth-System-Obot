const express = require('express');
const {check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const router = express.Router();

const User = require('../models/User')

const validate = [
  check('fullName')
    .isLength({min:2})
    .withMessage('Your Name is Required'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least six characters')
]

router.post('/register', validate, async (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(422).json({'errors': errors.array()})
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    fullName: req.body.fullName, 
    email: req.body.email, 
    password: hashPassword
  })

  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (error) {
    res.status(400).send(error)
  }

})


router.post('/login', (req, res) => {
  res.send('login route')
})

module.exports = router;