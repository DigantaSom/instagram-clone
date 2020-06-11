const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    body: { type: String, required: true },
    photo: { type: String }, // @todo - add, required: true
    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        },
    ],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            text: { type: String, required: true },
            name: String,
            date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('post', postSchema);
