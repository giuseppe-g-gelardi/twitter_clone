const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  text: { type: String, maxlength: 140, required: true },
  post: { type: mongoose.Types.ObjectId, ref: 'Post' },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  likes: { type: [ mongoose.Types.ObjectId ], default: [] },
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema)

exports.Reply = Reply
exports.replySchema = replySchema
