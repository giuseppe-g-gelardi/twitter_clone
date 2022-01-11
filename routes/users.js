const router = require('express').Router()
const { User, validateUser } = require('../models/User')
const bcrypt = require('bcrypt')

// ! add new user
router.post('/register', async (req, res) => {
  try {
    const { error } = validateUser(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered.')

    const salt = await bcrypt.genSalt(10)
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    })

    await user.save()

    const token = user.generateAuthToken()
    // const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT);
      return res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .send({ _id: user._id, username: user.username, email: user.email });

  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
}) 

// ! update user
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

// ! delete user 
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id)

    if (!user) return res
    .status(400)
    .send(`The user with the id: "${req.params.id}" does not exist.`)

    return res.send(user)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error ${ex}`)
  }
})

// ! get single user
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

// ! get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    return res.send(users)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// ! get all users that you follow and their posts
router.get('/:id/feed', async (req, res) => {
  try {
    let feed = []
    const user = await User.findById(req.params.id)
    const following = await User.find({'_id': {$in: user.following}})
    following.forEach(u => {
      u.posts.forEach(post => {
        feed.push({ 
          user: {
            id: u._id,
            username: u.username,
            profilePicture: u.profilePicture,
            verified: u.isVerified
        }, post: post })
      })
    })
    
    return res.send(feed)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// ! follow AND unfollow user. working? will test more
router.put('/:id/follow', async (req, res) => {
  // return res.status(200).send('endpoint works')
  if (req.body.userid !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userid)

      let message;
      if (user.followers.includes(req.body.userid)) {
        user.followers.pull(req.body.userid)
        currentUser.following.pull(req.params.id)
        message = 'You are no longer following this user'
      } else {
        user.followers.push(req.body.userid)
        currentUser.following.push(req.params.id)
        message = 'You are now following this user'
      }
      await user.save()
      await currentUser.save()
      return res.status(200).send(message)
      
  } catch (err) {
    res.status(500).send('ERR BRUH')
  }

  } else {
    res.status(403).send(err.message)
  }
})

module.exports = router


// TODO set up follow/unfollow in one route similar to like/unlike

// ! follow a user
// router.put("/:id/follow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (!user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $push: { followers: req.body.userId } });
//         await currentUser.updateOne({ $push: { following: req.params.id } });
//         res.status(200).json("user has been followed");
//       } else {
//         res.status(403).json("you allready follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant follow yourself");
//   }
// });

// ! unfollow a user
// router.put("/:id/unfollow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $pull: { followers: req.body.userId } });
//         await currentUser.updateOne({ $pull: { following: req.params.id } });
//         res.status(200).json("user has been unfollowed");
//       } else {
//         res.status(403).json("you dont follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant unfollow yourself");
//   }
// });

// ! delete user
// router.delete('/:id', async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id)
//       res.status(200).json('account has been deleted successfully')
//     } catch (err) {
//       return res.status(500).json(err)
//     }
//   } else {
//     return res.status(403).json('you can only delete your account')
//   }
// })
