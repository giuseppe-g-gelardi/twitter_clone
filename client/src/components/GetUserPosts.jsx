import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import FlipMove from 'react-flip-move'

import UserContext from '../context/UserContext'

import Post from './Post'
import SinglePost from './SinglePost'

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
      throw new Error(error.message)
    }
  }

  useEffect(() => getPosts())

  return (
    <>
      {displaySinglePost ? (
        <>
          <SinglePost
            key={user._id}
            user={user}
            post={displayPost}
            setDisplaySinglePost={setDisplaySinglePost}
            likeUnlike={likeUnlike}
          />
        </>
      ) : (
        <>

          {posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(post => (
            <Post
            key={post._id}
            user={user}
            post={post}
            setDisplaySinglePost={setDisplaySinglePost}
            setDisplayPost={setDisplayPost}
            likeUnlike={likeUnlike}
            />
            ))}
        </>
      )}
    </>
  )
}
