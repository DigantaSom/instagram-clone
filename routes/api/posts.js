const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/check-auth');

const Post = require('../../models/Post');

// @route		POST /api/posts/
// @desc		Create a post
// @access	  Private
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
                console.error(err);
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
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        });
    }
);

// @route		GET /api/posts
// @desc		Get all posts
// @access	  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['username', 'dp']).sort({ date: -1 });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route		GET /api/posts/:user_id
// @desc		Get all posts of a user by user_id
// @access	  Public
router.get('/:user_id', async (req, res) => {
    try {
        const posts = await Post.find({
            user: req.params.user_id,
        }).sort({ date: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
