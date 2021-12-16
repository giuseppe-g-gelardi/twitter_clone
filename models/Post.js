const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, maxlength: 140 },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  likes: { type: Array, default: [] },
  img: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)

