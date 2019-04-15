const express = require('express');
const router = express();
//Encrypter, Json Web Token & secret key
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').key;
const bcrypt = require('bcryptjs');
//Load Model
const User = require('../../model/User');
//Load Passport authentication
const passport = require('passport');
//Validators
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//@route  POST /api/user/register
//@desc   register a user
//@access Public
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) return res.status(400).json({ email: 'email already exists' });
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
        })
      })
    }
  })
  .catch(err => console.log(err));
})

//@route  POST /api/user/login
//@desc   User Login
//@access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
  .then(user => {
    if (!user) {
      return res.status(404).json({ email: 'User not Found' });
    }
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (!isMatch) {
        return res.status(404).json({ password: 'Incorrect password' });
      } else {
        //Setup jwt payload for getting token
        const payload = {
          id: user.id,
          name: user.name
        };
        //Get Token
        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          return res.json({
            msg: 'Successful Login',
            token: `Bearer ${token}`
          })
        })
      }
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err))
})

//@route  GET /api/user/current
//@desc   Get details of current User
//@access Public
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;
