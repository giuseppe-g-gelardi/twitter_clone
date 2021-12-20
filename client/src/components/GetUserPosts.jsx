import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from '@material-ui/core'

import UserContext from '../context/UserContext'
import CommentCard from './CommentCard'

export default function GetUserPosts () {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/posts/${user._id}/posts`)
        .then(response => setPosts(response.data))
    } catch (error) {
      throw new Error(error)
    }
  }

  const deletePost = async postId => {
    try {
      await axios.delete(
        `http://localhost:8000/api/posts/${user._id}/posts/${postId}`
      )
      getPosts()
    } catch (error) {
      throw new Error(error)
    }
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

  useEffect(() => getPosts())

  return (
    <Container>
      <h2>my posts: </h2>
      {posts.map(post => (
        <CommentCard key={post._id} user={user} post={post} deletePost={deletePost} />
      ))}
    </Container>
  )
}
