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
        check('password', 'Please enter a password with 5 or more characters').isLength({ min: 5 }),
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

            jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

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

module.exports = router;
