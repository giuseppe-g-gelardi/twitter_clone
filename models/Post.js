const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, maxlength: 140 },
  likes: { type: Array, default: [] },
  img: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)
