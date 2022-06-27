const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postId: { type: String },
  title: { type: String },
  contents: { type: String },
  categoryId: { type: Number },
  createdAt: { type: String },
})

const Post = mongoose.model('post', postSchema);

module.exports = { Post };