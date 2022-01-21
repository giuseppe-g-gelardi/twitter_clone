const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId },
  description: { type: String, maxlength: 140, required: true },
  likes: { type: [ mongoose.Types.ObjectId ], default: [] },
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

exports.Post = Post
exports.postSchema = postSchema
  // replies: { type: [replySchema], default: [] },
