const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Reply', replySchema)
