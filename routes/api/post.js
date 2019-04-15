const express = require('express');
const router = express();
//Load Post Model
const Post = require('../../model/Post');
//Load Profile Model for manipulating posts
const Profile = require('../../model/Profile');
//Load Passport for authentication
const passport = require('passport');
//Load Validations
const validatePostInput = require('../../validation/post');
//@route  GET /api/post/test
//@desc   Test route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'post' }));
//@route  POST /api/post/
//@desc   Create Post
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
})

//@route GET /api/post/
//@desc Return all posts
//@access Public
router.get('/', (req, res) => {
  Post.find()
  .then(posts => {
    if (!posts) {
      return res.status(404).json({ postsnotfound: 'No Posts'})
    }
    res.json(posts);
  })
  .catch(err => res.status(400).json(err));
})

//@route GET /api/posts/:post_id
//@desc Get one post of a user
//@access public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
  .then(post => {
    if (!post) {
      res.status(404).json({ postnotfound: 'No Post with that ID exists'});
    }
    res.json(post);
  })
  .catch(err => res.status(400).json(err));
})

//@route DELETE /api/post/:post_id
//@desc Delete a post by an authorized user
//@access Private
router.delete('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    Post.findById(req.params.post_id)
    .then(post => {
      //Authorization access
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ unauthorized: 'Unauthorized access'});
      }
      //Remove Post
      post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ nopostfound: 'No Post Found' }));
  })
})

//@route /api/post/like/:like_id
//@desc Like a Post
//@access Private
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    Post.findById(req.params.post_id)
    .then(post => {
      if (post.like.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ alreadyLiked: 'Post already liked' });
      }
      post.like.unshift({ user: req.user.id });

      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ nopostfound: 'No Post Found' }));
  })
})

//@route POST /api/post/unlike/:post_id
//@desc unlike a post
//@access Private
router.post('/unlike/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(post => {
    Post.findById(req.params.post_id)
    .then(post => {
      if (post.like.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ notLiked: 'Post not liked yet' });
      }
      //Index of like categorised by user id
      const removeIndex = post.like.map(like => like.user.toString()).indexOf(req.user.id)
      //Splice the array of likes
      post.like.splice(removeIndex, 1);
      //Save the Post
      post.save().then(post => res.json(post));
    })
  })
})
//@route POST /api/post/comment/:post_id
//@desc make a comment
//@access Private
router.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  console.log(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));

  Post.findById(req.params.post_id)
  .then(post => {
    //New comment
    const newComm = {
      text: req.body.text,
      name: req.body.name,
      user: req.user.id
    };
    //Add new commnent
    post.comment.unshift(newComm);
    //save
    post.save().then(post => res.json(post))
  })
  .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
})

//@route DELETE /api/post/comment/:post_id/:comment_id
//@desc Delete a comment
//@access Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.post_id)
  .then(post => {
    if (post.comment.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ commentnotexist: 'Comment does not exist' });
    }

    //Index for comment removal
    const removeIndex = post.comment.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
    //Splicing of the array of comments
    post.comment.splice(removeIndex, 1);
    //save
    post.save().then(post => res.json(post));
  })
  .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
})
module.exports = router;
