const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

const Reply = mongoose.model('Reply', replySchema)

exports.Reply = Reply
exports.replySchema = replySchema
