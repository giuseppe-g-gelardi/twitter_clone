const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  description: { type: String, maxlength: 140, required: true },
  user: { type: [ mongoose.Types.ObjectId ] },
  likes: { type: [ mongoose.Types.ObjectId ], default: [] },
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

exports.Post = Post
exports.postSchema = postSchema
  // replies: { type: [replySchema], default: [] },
