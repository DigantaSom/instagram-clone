const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    caption: String,
    photo: { type: String, required: true },
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
            date: { type: Date, default: Date.now, required: true },
        },
    ],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('post', postSchema);
