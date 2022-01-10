import { useContext, useState, useEffect } from 'react'
import Post from './Post'
import SinglePost from './SinglePost'
import UserContext from '../context/UserContext'
import { fetchPosts, likes } from '../api/posts.ts'

export default function GetUserPosts () {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const [displaySinglePost, setDisplaySinglePost] = useState(false)
  const [displayPost, setDisplayPost] = useState('')

  const getPosts = async() => {
    try {
      const userPosts = await fetchPosts(user._id)
      setPosts(userPosts)
      
    } catch(error) {
      throw new Error(error)
    }
  }

  const likeUnlike = async postid => {
    let update = { userId: user._id }
    try {
      await likes(user._id, postid, update)
      } catch (error) {
        throw new Error(error.message)
      }
    }
    
    useEffect(() => getPosts(), [user])

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
