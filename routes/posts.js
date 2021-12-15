const router = require('express').Router()
const Post = require('../models/Post')

// create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try{
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update a post
// ! may remove function to keep in like with twitter 
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json('your post has been updated')
    } else {
      res.status(403).json('you can only update your posts')
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

// delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body })
      res.status(200).json('your post has been deleted')
    } else {
      res.status(403).json('you can only delete your posts')
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

// like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post
router.get('/:id', async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

// ! not currently working as intended
// * will likely sort on the front end
// // get all posts that a user is following // timeline posts
// router.get("/timeline/all", async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.body.userId);
//     const userPosts = await Post.find({ userId: currentUser._id });
//     const friendPosts = await Promise.all(
//       currentUser.following.map((friendId) => {
//         return Post.find({ userId: friendId });
//       })
//     );
//     res.json(userPosts.concat(...friendPosts))
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// * get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    return res.send(posts)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// TODO replies ?

// router.put('/:id/comment', async (req, res) => {

// })

module.exports = router


