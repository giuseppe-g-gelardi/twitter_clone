import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import UserContext from '../context/UserContext'
import { getUser } from '../api/users.ts'
import { fetchPosts, likes as likePost } from '../api/posts.ts'
import UserSinglePost from './UserSinglePost'
import UserPost from './UserPost'
import UserProfileHeader from './UserProfileHeader'

export default function UserProfile () {
  const { user } = useContext(UserContext)
  const [userProfile, setUserProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [displaySinglePost, setDisplaySinglePost] = useState(false)
  const [displayPost, setDisplayPost] = useState('')
  const [likes, setLikes] = useState([])
  const { id } = useParams()

  const fetchUser = async () => {
    try {
      const pageOwner = await getUser(id)
      setUserProfile(pageOwner)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const getPosts = async () => {
    try {
      const userPosts = await fetchPosts(userProfile._id)
      setPosts(userPosts)
    } catch (error) {
      throw new Error(error)
    }
  }

  const likeUnlike = async postid => {
    let newLike = { userid: user._id }
    try {
      await likePost(userProfile._id, postid, newLike)
      setLikes([...likes, newLike])
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => fetchUser(), [userProfile])
  useEffect(() => getPosts())

  return (
    <div>
      <h1>You are viewing another users profile</h1>
      <h3>You are viewing {userProfile?.username}'s profile</h3>

      <>
        <UserProfileHeader />
        {displaySinglePost ? (
          <>
            <UserSinglePost
              user={userProfile}
              post={displayPost}
              setDisplaySinglePost={setDisplaySinglePost}
              likeUnlike={likeUnlike}
            />
          </>
        ) : (
          <>
            <h2>my posts: </h2>
            {posts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map(post => (
                <UserPost
                  key={post._id}
                  user={userProfile}
                  post={post}
                  setDisplaySinglePost={setDisplaySinglePost}
                  setDisplayPost={setDisplayPost}
                  likeUnlike={likeUnlike}
                />
              ))}
          </>
        )}
      </>
    </div>
  )
}
