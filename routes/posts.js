const router = require('express').Router()
const { Error, Mongoose } = require('mongoose')
const { Post } = require('../models/Post')
const { Reply } = require('../models/Reply')
const { User } = require('../models/User')

// ! get all {user} posts
// * VERIFIED WORKING
router.get('/:id/posts', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user.posts)
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

// // update a post
// // ! may remove function to keep in like with twitter 
// router.put('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id)
//     if (post.userId === req.body.userId) {
//       await post.updateOne({ $set: req.body })
//       res.status(200).json('your post has been updated')
//     } else {
//       res.status(403).json('you can only update your posts')
//     }
//   } catch(err) {
//     res.status(500).json(err)
//   }
// })




//post a reply
// router.post("/:userId/:postId", async (req, res) => {
//   try {

//     const post = await Post.findById(req.params.postId);
//     if (!post)
//       return res
//         .status(400)
//         .send(`The post with id "${req.params.postId}" does not exist.`);

//     const reply = new Reply({
//         text: req.body.text,
//     });

//     post.replies.push(reply);

//     await post.save();
//     return res.send(post.replies);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// // get a post
// router.get('/:id', async (req, res) => {
//   try{
//     const post = await Post.findById(req.params.id)
//     res.status(200).json(post)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })






// // like a post
// router.put("/:id/like", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post.likes.includes(req.body.userId)) {
//       await post.updateOne({ $push: { likes: req.body.userId } });
//       res.status(200).json("The post has been liked");
//     } else {
//       await post.updateOne({ $pull: { likes: req.body.userId } });
//       res.status(200).json("The post has been disliked");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });






// // TODO replies ?

// //post a reply
// router.post("/:postId/replies/", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.postId);
//     if (!post)
//       return res
//         .status(400)
//         .send(`The post with id "${req.params.postId}" does not exist.`);

//     const reply = new Reply({
//         text: req.body.text,
//     });

//     post.replies.push(reply);

//     await post.save();
//     return res.send(post.replies);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

//gets all replies of a comment
// router.get("/:postId/replies/", async (req, res) => {
//   try {
//       const post = await Post.findById(req.params.postId);
//       if (!post)
//         return res
//           .status(400)
//           .send(`The post with id "${req.params.postId}" does not exist.`);
//   const reply = await Reply.find();
//     return res.send(post.replies);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });


module.exports = router


