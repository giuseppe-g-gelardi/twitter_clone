import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Container } from '@material-ui/core'

import UserContext from '../context/UserContext'
import CommentCard from './CommentCard'
import CommentDisplay from './CommentDisplay'

export default function GetUserPosts () {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const [displaySinglePost, setDisplaySinglePost] = useState(false)
  const [displayPost, setDisplayPost] = useState('')

  const getPosts = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/posts/${user._id}/posts`)
        .then(response => setPosts(response.data))
    } catch (error) {
      throw new Error(error)
    }
  }

  const likeUnlike = async postId => {
    let update = {
      userId: user._id
    }
    try {
      await axios.put(
        `http://localhost:8000/api/posts/${user._id}/posts/${postId}/likes`,
        update
      )
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => getPosts())

  return (
    <>
      {displaySinglePost ? (
        <>
          <Button onClick={() => setDisplaySinglePost(false)}>Go Back</Button>
          <Button onClick={() => console.log(displayPost)}>Log Post</Button>
          <Container>
            <CommentDisplay
              key={user._id}
              user={user}
              post={displayPost}
              setDisplaySinglePost={setDisplaySinglePost}
              likeUnlike={likeUnlike}
            />
          </Container>
        </>
      ) : (
        <Container>
          <h2>my posts: </h2>
          {posts.map(post => (
            <CommentCard
              key={post._id}
              user={user}
              post={post}
              setDisplaySinglePost={setDisplaySinglePost}
              setDisplayPost={setDisplayPost}
              likeUnlike={likeUnlike}
            />
          ))}
        </Container>
      )}
    </>
  )
}

// ? also maybe no need!!
// const getReplies = async postId => {
//   try {
//     await axios.get(
//       `http://localhost:8000/api/posts/${user._id}/posts/${postId}/replies`
//       // `http://localhost:8000/api/posts/61baaced780cf3e51957becb/posts/61bfa551daf8c37fc5403ae0/replies`
//     ) // hardcoded url /userId/posts/postId/replies
//     .then (response => console.log(response))

//   } catch (error) {
//     throw new Error(error)
//   }
// }

// ? maybe no need
// const getSinglePost = async postId => {
//   try {
//     await axios.get(
//       `http://localhost:8000/api/posts/${user._id}/posts/${postId}`
//     )
//   } catch (error) {
//     throw new Error(error)
//   }
// }
// const getReplies = async postId => {
//   try {
//     await axios
//       .get(`http://localhost:8000/api/posts/${user._id}/posts/${postId}/replies`)
//       .then(response => setReplies(response.data))

//   } catch (error) {
//     throw new Error(error)
//   }
// }


 // const createPost = async e => {
  //   e.preventDefault()

  //   const newPost = {
  //     description: description
  //   }

  //   try {
  //     await axios
  //       .post(`http://localhost:8000/api/posts/${user._id}`, newPost)
  //       setPosts([...posts, newPost])
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }
  // const deletePost = async postId => {
  //   try {
  //     await axios.delete(
  //       `http://localhost:8000/api/posts/${user._id}/posts/${postId}`
  //     )
  //     getPosts()
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }
              // deletePost={deletePost}
