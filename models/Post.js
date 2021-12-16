const mongoose = require('mongoose')
const { replySchema } = require('./Reply')

const postSchema = new mongoose.Schema({
  description: { type: String, maxlength: 140 },
  replies: { type: [replySchema] },
  likes: { type: [ mongoose.Types.ObjectId ], default: [] },
  img: { type: String }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

exports.Post = Post
exports.postSchema = postSchema
