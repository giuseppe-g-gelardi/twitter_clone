const router = require('express').Router()
const { Post } = require('../models/Post')
const { Reply } = require('../models/Reply')
const { User } = require('../models/User')

// * get all replies
router.get('/', async (req, res) => {
  try {
    const replies = await Reply.find()
    return res.send(replies)
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})

// * get single reply
router.get('/:replyid', async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.replyid)
    res.status(200).send(reply)
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})

// * add new reply
router.post('/', async (req, res) => {
  try {
    const reply = new Reply({
      text: req.body.text,
      user: req.body.userid,
      post: req.body.postid
    })

    await reply.save()
    return res.send(reply)
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})


module.exports = router
