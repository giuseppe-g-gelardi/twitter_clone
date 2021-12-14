const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        return res.status(500).json(err)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json('account has been updated')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('you can only update your account')
  }
})

// delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json('account has been deleted successfully')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('you can only delete your account')
  }
})

// get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
    // this will get everthing but password and updated at since they are unnecessary
    // res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    return res.send(users)
  } catch (err) {
    return res.status(500).json(err)
  }
})

//follow a user

//unfollow a user

module.exports = router
