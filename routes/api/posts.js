const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../../middleware/check-auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route		GET /api/posts
// @desc		Get all posts
// @access	  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['username', 'dp']);
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route		POST /api/post
// @desc		Create a post
// @access	  Private
router.post(
    '/',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('body', 'Body is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { title, body, photo } = req.body;
        try {
            const newPost = new Post({
                user: req.user.id,
                title,
                body,
                photo,
            });

            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route		GET /api/posts/:user_id
// @desc		Get all posts of a user by user_id
// @access	  Public
router.get('/:user_id', async (req, res) => {
    try {
        const post = await Post.findOne({
            user: req.params.user_id,
        }).populate('user', ['name', 'username', 'dp', 'followers', 'following']);

        res.status(200).json(post);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
