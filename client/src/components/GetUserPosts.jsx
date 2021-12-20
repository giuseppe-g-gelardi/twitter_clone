import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'
import CommentCard from './CommentCard'
import { Button, Container } from '@material-ui/core'

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

  useEffect(() => {
    getPosts()
  }, [user])

  return (
    <Container>
      <Button onClick={() => console.log(posts)}>log posts</Button>
      <h2>my posts: </h2>
      {posts.map(post => (
        <CommentCard key={post._id} user={user} post={post} deletePost={deletePost} />
      ))}
    </Container>
  )
}
