const mongoose = require('mongoose')
const { postSchema } = require('./Post')
const Joi = require('joi')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

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
  notifications: { type: Array, default: [] },
  theme: { type: String, default: 'light'},
  createdAt: { type: String }
}, {timestamps: true})

UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, username: this.username, email: this.email}, process.env.JWT)
}

const User = mongoose.model('User', UserSchema)

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().max(16).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(user)
}

exports.User = User
exports.validateUser = validateUser
exports.UserSchema = UserSchema
