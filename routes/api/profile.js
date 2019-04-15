const express = require('express');
const router = express();
//Load Profile Model
const Profile = require('../../model/Profile')
//Load Mongoose and Passport for authentication and DB access
const mongoose = require('mongoose');
const passport = require('passport');
//Load User Model for profile to access it
const User = require('../../model/User');
//Validations
const validateProfileInput = require('../../validation/profile');
const validateRecipeInput = require('../../validation/recipe');
//@route  GET /api/profile/test
//@desc   Test route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'profile' }));

//@route  GET /api/profile
//@desc   Return a users profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .populate('users', ['name', 'email'])
  .then(profile => {
    const errors = {};
    if (!profile) {
      errors.noprofile = 'No such profile exists';
      return res.status(404).json(errors);
    }
    return res.json(profile)
  })
  .catch(err => res.status(404).json(err));
})

//@route  POST /api/profile
//@desc   Create and Edit Profile
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  //Validations
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {

    return res.status(400).json(errors);
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.bio) profileFields.bio = req.body.bio;
  //Recipes Read is an array which has objects so we need to iterate over the objects
  //Use different route for experiences as this requires a diff form
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    if (profile) {
      //update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      .then(profile => res.json(profile))
    } else {
      //Create a new one and chck if handle exists
      Profile.findOne({ handle: profileFields.handle })
      .then(profile => {
        if (profile) {
          errors.handle = 'Handle already exists';
          return res.status(400).json(errors);
        }
        //Save
        Profile(profileFields).save().then(profile => res.json(profile))
      })

    }
  })
})

//@route GET /api/profile/all
//@desc Return all Profiles
//@access Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
  .then(profiles => {
    if (!profiles) {
      errors.profiles = 'No profiles found'
      return res.status(404).json(errors)
    }
    return res.json(profiles);
  })
})

//@route GET /api/profile/handle/:handle
//@desc View user profile by handle
//@access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
  .then(profile => {
    if (!profile) {
      errors.profile = 'Profile does not exist';
      return res.status(404).json(errors);
    }
    return res.json(profile)
  })
})

//@route Get /api/profile/user/:user_id
//@desc View user profile by user_id
//@access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
  .then(profile => {
    if (!profile) {
      errors.profile = 'Profile does not exist';
      return res.status(404).json(errors);
    }
    return res.json(profile)
  })
})

//@route POST /api/profile/recipesstored
//@desc add recipes read
//@access Private
router.post('/recipesstored', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const err = {};
    if (!profile) {
      err.profile = 'No Profile found';
      return res.status(404).json(err)
    }
    const recipeDetails = {
      title: req.body.title,
      instructions: req.body.instructions,
      image: req.body.image,
      servings: req.body.servings,
      readyInMinutes: req.body.readyInMinutes,
      id: req.body.id
    };

    profile.recipesStored.unshift(recipeDetails);

    profile.save().then(profile => res.json(profile))
  })
})

//@route GET /api/profile/getrecipes
//@desc Get Recipes
//Route PRIVATE
router.get('/getrecipes', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    return res.json(profile.recipesStored);
  })
})

//@route DELETE /api/profile/recipesstored/:recipesstored
//@desc Delete a recipe
//@access PRIVATE
router.delete('/recipesstored/:recipesstored_id', passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    //Get remove index
    const removeIndex = profile.recipesStored.map(recipe => recipe.id).indexOf(req.params.recipesstored_id);

    //Splice Array
    profile.recipesStored.splice(removeIndex, 1);
    // //Save Profile
    profile.save().then(profile => res.json(profile));
  })
})

//@route Delete Profile along with user
//@desc Deleet a Profile
//@access private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
