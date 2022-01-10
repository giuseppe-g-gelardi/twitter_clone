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

  const getPosts = () => {
    fetchPosts(user._id).then((res) => setPosts(res.data)).catch((err) => console.log(err))
  }

  const likeUnlike = postid => {
    let update = { userId: user._id }
    likes(user._id, postid, update).catch((err) => console.log(err))
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
