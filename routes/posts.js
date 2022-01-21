const router = require('express').Router()
const { Post } = require('../models/Post')
const { Reply } = require('../models/Reply')
const { User } = require('../models/User')

// ! start rework

// * get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    return res.send(posts)
  } catch (error) {
    return res.status(500).send(`Unable to fetch posts! ${error}`)
  }
})

// * get all USER posts
router.get('/:userid/posts', async (req, res) => {
  try {
    const posts = (await Post.find()).filter(post => post.user.toString() === req.params.userid)

    return res.status(200).send(posts)
  } catch (error) {
    return res.status(500).send(`Unable to fetch posts: ${error}`)
  }
})

// * get single posts
router.get('/:postid', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid)
    return res.status(200).send(post)
  } catch (error) {
    return res.status(500).send(`Unable to fetch post! ${error}`)
  }
})


// * add new post
router.post('/', async (req, res) => {
  try {
    const post = new Post({
      description: req.body.description,
      user: req.body.userid
    })

    await post.save()
    return res.send(post)
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})

// ! end rework
// ! end rework
// ! end rework
// ! end rework
// ! end rework
// ! end rework
// ! end rework
// ! end rework
// ! end rework
// ! end rework




// ?
// ?
// ?
// ?
// ?
// ?
// ?


// ! start old backend structure










// ! get all {user} posts
// * VERIFIED WORKING
router.get('/:id/posts', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).send(user.posts)
  } catch (err) {
    res.status(500).json(err)
  }
})

//! get single post
// * VERIFIED WORKING
router.get('/:userId/posts/:postId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const posts = await user.posts.filter(post => post._id.toString() === req.params.postId.toString())
    
    res.status(200).send(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// ! delete a post
// * VERIFIED WORKING
router.delete('/:userId/posts/:postId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist`)

    let post = user.posts.id(req.params.postId)
    if (!post)
      return res
        .status(400)
        .send(`The post with id "${req.params.postId}" does not exist`)

    post = await post.remove()

    await user.save()
    return res.send(user)
  
  } catch(err) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
})

// ! add new post
// * VERIFIED WORKING
router.post('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist`)

    const post = new Post({
      description: req.body.description
    })

    user.posts.push(post)

    await user.save()
    return res.send(user.posts)

  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
})

// ! get all replies to a post
// * VERIFIED WORKING
router.get('/:userId/posts/:postId/replies', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist`)

    let post = user.posts.id(req.params.postId)
    if (!post)
      return res
        .status(400)
        .send(`The post with id "${req.params.postId}" does not exist`)    

    let replies = post.replies

    res.status(200).send(replies)
  } catch (err) {
    res.status(500).json(err)
  }
})

// ! get single reply on a post
// * VERIFIED WORKING
router.get('/:userId/posts/:postId/replies/:replyId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist`)

    let post = user.posts.id(req.params.postId)
    if (!post)
      return res
        .status(400)
        .send(`The post with id "${req.params.postId}" does not exist`)    

    let reply = post.replies.id(req.params.replyId)
    if (!reply)
      return res
        .status(400)
        .send(`The reply with id "${req.params.replyId}" does not exist`)

    res.status(200).send(reply)
  } catch (err) {
    res.status(500).json(err)
  }
})

// ! post new reply to a post
// * VERIFIED WORKING
router.post('/:userId/posts/:postId/replies', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist`)

    let post = user.posts.id(req.params.postId)
    if (!post)
      return res
        .status(400)
        .send(`The post with id "${req.params.postId}" does not exist`)

    let reply = new Reply({
      text: req.body.text,
      user: req.body.user
    })
    
    post = await post.replies.push(reply)

    await user.save()
    return res.send(user)
  
  } catch(err) {
    return res.status(500).send(`Internal Server Error: ${err.message}`);
  }
})

// ! delete single reply
// * VERIFIED WORKING
router.delete('/:userId/posts/:postId/replies/:replyId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist`)

    let post = user.posts.id(req.params.postId)
    if (!post)
      return res
        .status(400)
        .send(`The post with id "${req.params.postId}" does not exist`)    

    let reply = post.replies.id(req.params.replyId)
    if (!reply)
      return res
        .status(400)
        .send(`The reply with id "${req.params.replyId}" does not exist`)

    reply = await reply.remove()

    await user.save()
    return res.send(post)


  } catch (err) {
    res.status(500).json(err)
  }
})

// ! get all likes to a post
// * VERIFIED WORKING
router.get('/:userId/posts/:postId/likes', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist`)

    let post = user.posts.id(req.params.postId)
    if (!post)
      return res
        .status(400)
        .send(`The post with id "${req.params.postId}" does not exist`)    

    let likes = post.likes

    res.status(200).send(likes)
  } catch (err) {
    res.status(500).json(err)
  }
})

// ! like/unlike post
// * VERIFIED WORKING
router.put('/:userId/posts/:postId/likes', async (req, res) => {
  try{
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(400)
        .send(`The user with id "${req.params.userId}" does not exist`)
    let post = user.posts.id(req.params.postId)
    if (!post) return res.status(400)
        .send(`The post with id "${req.params.postId}" does not exist`)

    let message;
    if (post.likes.includes(req.body.userId)) {
      post.likes.pull(req.body.userId)
      message = 'disliked'
    } else { 
      post.likes.push(req.body.userId)
      message = 'liked'
    }
    await user.save()
    return res.status(200).json(message)


  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router
