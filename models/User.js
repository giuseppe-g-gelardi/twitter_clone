const mongoose = require('mongoose')
const { postSchema } = require('./Post')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 16, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstname: { type: String },
  lastname: { type: String },
  bio: { type: String, maxlength: 140 },
  location: { type: String, maxlength: 100 },
  profilePicture: { type: String, default: '' },
  profileBanner: { type: String, default: '' },
  protected: { type: Boolean, default: false },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  posts: { type: [ postSchema ], default: [] },
  createdAt: { type: String }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)

exports.User = User
exports.UserSchema = UserSchema
