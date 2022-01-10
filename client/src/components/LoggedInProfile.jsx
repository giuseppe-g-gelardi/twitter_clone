import { useState, useEffect, useContext } from 'react'

import UserContext from '../context/UserContext'
import SinglePost from './SinglePost'
import Post from './Post'
import CreatePost from './CreatePost'
import LoggedInProfileHeader from './LoggedInProfileHeader'
import { fetchPosts, likes as likePost, deletePost } from '../api/posts.ts'

export default function LoggedInProfile () {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const [displaySinglePost, setDisplaySinglePost] = useState(false)
  const [displayPost, setDisplayPost] = useState('')
  const [likes, setLikes] = useState([])

  // fetchPosts(user._id).then(res => setPosts(res.data)).catch((err) => console.log(err, 'error in getposts function in logged in profile component'))

  useEffect(() => {
    let isCancelled = false
    fetchPosts(user._id).then(res => {
      if (!isCancelled) {
        setPosts(res.data)
      }
    })
    return () => {
      isCancelled = true
    }
  }, [user._id, likes, posts])

  const likeUnlike = postid => {
    let newLike = { userid: user._id }
    likePost(user._id, postid, newLike).then(setLikes([...likes, newLike])).catch((err) => console.log(err, 'error liking or unliking a post un logged in profile component'))
  }

  return (
    <div>
      <>

        {displaySinglePost ? (
          <>
            <SinglePost
              key={user._id}
              user={user}
              post={displayPost}
              setDisplaySinglePost={setDisplaySinglePost}
              likeUnlike={likeUnlike}
              deletePost={deletePost}
            />
          </>
        ) : (
          <>
        <LoggedInProfileHeader />
            <CreatePost />
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
                  deletePost={deletePost}
                />
              ))}
          </>
        )}
      </>
    </div>
  )
}
