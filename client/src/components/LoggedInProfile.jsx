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

  const getPosts = async () => {
    try {
      const userPosts = await fetchPosts(user._id)
      setPosts(userPosts)
    } catch (error) {
      throw new Error(error)
    }
  }

  const likeUnlike = async postid => {
    let newLike = { userid: user._id }
    try {
      await likePost(user._id, postid, newLike)
      setLikes([...likes, newLike])
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => getPosts())

  return (
    <div>
      <>
        <LoggedInProfileHeader user={user} id={user._id} />

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
            <CreatePost />
            <h2>my posts: </h2>
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
