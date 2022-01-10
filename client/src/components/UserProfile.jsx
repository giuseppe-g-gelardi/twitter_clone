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



  useEffect(() => {
    let isCancelled = false
    fetchPosts(id).then(res => {
      if (!isCancelled) {
        setPosts(res.data)
      }
    }).catch(err => console.log(err, ' trouble fetching posts in userprofile'))
    return() => {
      isCancelled = true
    }
  }, [id])


  const likeUnlike = postid => {
    let newLike = { userid: user._id }
    likePost(id, postid, newLike).then(setLikes([...likes, newLike])).catch(err => console.log(err, 'error liking or unliking post in user profile component'))
  }

  return (
    <div>
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
    // const getPosts = () => {
  //   fetchPosts(id)
  //   .then(res => setPosts(res.data))
  //   .catch(err => console.log(err, 'error fetching posts in userprofile component'))
  // }
  // useEffect(() => fetchUser(), [])
  // useEffect(() => getPosts(), [likes])
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
  // useEffect(() => {
  //   fetchPosts(id)
  //   .then(res => setPosts(res.data))
  //   .catch(err => console.log(err, 'error fetching posts in userprofile component'))
  // })
      // useEffect(() => {
  //   let isCancelled = false
  //   fetchPosts(user._id).then(res => {
  //     if (!isCancelled) {
  //       setPosts(res.data)
  //     }
  //   })
  //   return () => {
  //     isCancelled = true
  //   }
  // }, [user._id])
