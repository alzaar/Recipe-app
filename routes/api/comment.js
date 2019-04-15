const express = require('express');

const router = express();

const Comment = require('../../model/Comment');

const passport = require('passport');


//Create comment
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const newComment = new Comment({
    text: req.body.commentData.text,
    name: req.body.commentData.name,
    recipe_id: req.body.commentData.recipe_id,
    user: req.user.id
  });
  return newComment.save()
    .then(comment =>res.json(comment))
})
//Get Comemnts
router.get('/:recipe_id', (req, res) => {
  return Comment.find({ recipe_id: req.params.recipe_id })
  .then(com => res.json(com))
})


module.exports = router;
