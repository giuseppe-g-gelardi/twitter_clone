const router = require('express').Router()
const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()

// register new user 
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt)
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// login existing user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    !user && res.status(404).send('user not found')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json('wrong password')

    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// router.post("/login", async (req, res) => {
//   try {
//     // const { error } = validateLogin(req.body);
//     // if (error) return res.status(400).send(error.details[0].message);
//     let user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(400).send("Invalid email or password.");
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!validPassword)return res.status(400).send("Invalid email or password.");

//     const token = user.generateAuthToken()
//     return res.send(token);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

module.exports = router
