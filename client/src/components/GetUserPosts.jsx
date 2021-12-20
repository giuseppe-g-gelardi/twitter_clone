import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
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

  useEffect(() => {
    getPosts()
  }, [user])

  return (
    <div>
      <button onClick={() => console.log(posts)}>log posts</button>
      <h2>my posts: </h2>
      {posts.map(post => (
        <CommentCard user={user} post={post} deletePost={deletePost} />
      ))}
    </div>
  )
}
