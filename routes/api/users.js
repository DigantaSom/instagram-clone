const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/check-auth');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route		GET /api/users
// @desc		Get all users
// @access	  Developer only
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route		POST /api/users
// @desc		Register a user
// @access	  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please enter a password with 5 or more characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, username, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }],
        });
      }

      user = new User({ name, email, username, password });

      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route		PUT /api/users/bio
// @desc		Add or update bio
// @access	  Private
router.put('/bio', [auth, [check('bio', 'Bio is required')]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const bio = {
    bio: req.body.bio,
  };
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: bio },
      { new: true, upsert: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route		GET /api/users/:user_id
// @desc		Get a specific user's info
// @access	  Public
router.get('/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route		DELETE /api/users
// @desc		Delete a user and her/his posts
// @access	  Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    await Post.findOneAndDelete({ user: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       PUT /api/users/follow
// @desc        Follow a user
// @access      Private
router.put('/follow', auth, async (req, res) => {
  const followId = req.body.followId;
  if (!followId) {
    return res.status(400).json({
      msg: 'Follow ID not provided',
    });
  }
  try {
    if (req.user.id === followId) {
      return res.status(400).json({
        msg: 'You cannot follow or unfollow yourself',
      });
    } else {
      const followingUser = await User.findByIdAndUpdate(
        followId,
        {
          $addToSet: { followers: req.user.id }, // $addToSet only allows unique values to be entered
        },
        { new: true }
      ).select('-password');

      const followerUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $addToSet: { following: followId },
        },
        { new: true }
      ).select('-password');

      res.status(200).json(followingUser);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       PUT /api/users/unfollow
// @desc        Unfollow a user
// @access      Private
router.put('/unfollow', auth, async (req, res) => {
  const unfollowId = req.body.unfollowId;
  if (!unfollowId) {
    return res.status(400).json({
      msg: 'Unfollow ID not provided',
    });
  }
  try {
    if (req.user.id === unfollowId) {
      return res.status(400).json({
        msg: 'You cannot follow or unfollow yourself',
      });
    } else {
      const unfollowingUser = await User.findByIdAndUpdate(unfollowId, {
        $pull: { followers: req.user.id },
      }).select('-password');
      const unfollowerUser = await User.findByIdAndUpdate(req.user.id, {
        $pull: { following: unfollowId },
      }).select('-password');

      res.status(200).json(unfollowerUser);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// to empty following array ->
// db.users.update({username: 'name2'}, {
// 	$set: {following: []}
// });
// // to empty followers array ->
// db.users.update({username: 'digsmash111'}, {
// 	$set: {followers: []}
// });
