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
      username: { type: String, required: true },
      dp: { type: String }, // @todo - put required true here
      date: { type: Date, default: Date.now, required: true },
      replies: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
          text: { type: String, required: true },
          name: { type: String, required: true },
          dp: { type: String }, // @todo - put required true here
          date: { type: Date, default: Date.now, required: true },
        },
      ],
      comment_likes: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        },
      ],
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('post', postSchema);
