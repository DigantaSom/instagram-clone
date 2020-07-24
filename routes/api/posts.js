const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/check-auth');
const mongoose = require('mongoose');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route		POST /api/posts
// @desc		Create a post
// @access	Private
router.post(
  '/',
  // [auth, [check('photo', 'Photo is required').not().isEmpty()]],
  auth,
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         errors: errors.array(),
    //     });
    // }

    const file = req.files.photo;

    file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, async err => {
      if (err) {
        // console.error(err);
        return res.status(500).send(err);
      }
      // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      const filePath = `/uploads/${file.name}`;
      try {
        const newPost = new Post({
          user: req.user.id,
          caption: req.body.caption,
          photo: filePath,
        });

        const post = await newPost.save();
        res.json(post);
      } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server Error');
      }
    });
  }
);

// @route   GET /api/posts/all
// @desc    Get all posts
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', ['username', 'dp'])
      .sort({ date: -1 });
    res.status(200).json(posts);
  } catch (err) {
    // console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts
// @desc    Get all posts of me (logged in user) and all the users I'm (logged in user) following
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // find all the users I'm (logged in user) following
    const users = await User.find({ followers: req.user.id });
    let ids = [];
    users.forEach(u => ids.push(u._id));

    // find all the posts of me (logged in user) and all the users I'm (logged in user) following
    const posts = await Post.find({
      user: { $in: [req.user.id, ...ids] },
    }).populate('user', ['username', 'dp']);

    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route	  GET /api/posts/:user_id
// @desc    Get all posts of a user by user_id
// @access	Public
router.get('/:user_id', async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.params.user_id,
    }).sort({ date: -1 });

    res.status(200).json(posts);
  } catch (error) {
    // console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts/p/:post_id
// @desc    Get a post by post_id
// @access  Public
router.get('/p/:post_id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({
        msg: 'No post found',
      });
    }
    res.status(200).json(post);
  } catch (err) {
    // console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/posts/p/:post_id
// @desc    Delete a post by post_id
// @access  Private
router.delete('/p/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    // check if post exists or not by that post_id
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // only the user who created the post, shall delete the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    // if all is okay, then delete the post
    await post.delete();
    res.status(200).json({ msg: 'Post deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/posts/p/like/:post_id
// @desc    Like a post
// @access  Private
router.put('/p/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    // check if the post has already been liked by the same user
    if (post.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({
        msg: 'Post already liked',
      });
    }
    // if all's okay, then like the post
    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.status(200).json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/posts/p/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put('/p/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    // check if the post hasn't even been liked yet by the user
    if (post.likes.some(like => like.user.toString() !== req.user.id)) {
      return res.status(400).json({
        msg: "Post hasn't been liked yet",
      });
    }
    // if all's okay, then unlike the post
    post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);

    await post.save();
    res.status(200).json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
