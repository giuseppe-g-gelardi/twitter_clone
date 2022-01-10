import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import UserContext from '../context/UserContext'
import { fetchPosts, likes as likePost } from '../api/posts.ts'
import UserSinglePost from './UserSinglePost'
import UserPost from './UserPost'
import UserProfileHeader from './UserProfileHeader'

export default function UserProfile () {
  const { user } = useContext(UserContext)
  // const [userProfile, setUserProfile] = useState([])
  const [posts, setPosts] = useState([])
  const [displaySinglePost, setDisplaySinglePost] = useState(false)
  const [displayPost, setDisplayPost] = useState('')
  const [likes, setLikes] = useState([])
  const { id } = useParams()

  
  // useEffect(() => {
    //   getUser(id).then(res => setUserProfile(res.data)).catch(err => console.log(err, 'error fetching user in userprofile component'))
    // })
    
    // useEffect(() => {
      //   fetchPosts(userProfile._id).then(res => setPosts(res.data)).catch(err => console.log(err, 'error fetching posts in userprofile component'))
      // })
  // const fetchUser = () => {
  //   getUser(id)
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err, 'error fetching user in userprofile component'))
  // }

  const getPosts = () => {
    fetchPosts(id)
    .then(res => setPosts(res.data))
    .catch(err => console.log(err, 'error fetching posts in userprofile component'))
  }

  const likeUnlike = postid => {
    let newLike = { userid: user._id }
    likePost(id, postid, newLike).then(setLikes([...likes, newLike])).catch(err => console.log(err, 'error liking or unliking post in user profile component'))
  }

  // useEffect(() => fetchUser(), [])
  useEffect(() => getPosts(), [likes])

  return (
    <div>
      <h1>You are viewing another users profile</h1>
      {/* <h3>You are viewing {userProfile?.username}'s profile</h3> */}

      <>
        {displaySinglePost ? (
          <>
            <UserSinglePost
              user={id}
              post={displayPost}
              setDisplaySinglePost={setDisplaySinglePost}
              likeUnlike={likeUnlike}
            />
          </>
        ) : (
          <>
        <UserProfileHeader />

            <h2>my posts: </h2>
            {posts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map(post => (
                <UserPost
                  key={post._id}
                  user={id}
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
