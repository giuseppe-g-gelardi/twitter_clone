import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import UserContext from '../context/UserContext'
import SinglePost from './SinglePost'
import Post from './Post'

import { getUser } from '../api/users.ts'

export default function UserProfile () {
  const { user } = useContext(UserContext)
  const [userProfile, setUserProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [displaySinglePost, setDisplaySinglePost] = useState(false)
  const [displayPost, setDisplayPost] = useState('')
  const [likes, setLikes] = useState([])

  const { id } = useParams()
  const api = `http://localhost:8000/api/users/${id}`
  // 61baaced780cf3e51957becb // seppe / user@email.com's user._id

  // TODO
  // TODO consolidate comment card and comment display into one component
  // TODO keep doing great things
  // TODO

  // TODO map replies newest => oldest, like comments

  const fetchUser = async () => {
    try {
      const pageOwner = await getUser(id)
      setUserProfile(pageOwner)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  // TODO: import getposts function from api
  const getPosts = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/posts/${id}/posts`)
        .then(response => setPosts(response.data))
    } catch (error) {
      throw new Error(error)
    }
  }

  // TODO: import likes function from api
  const likeUnlike = async postId => {
    let newLike = {
      userId: user._id
    }
    try {
      await axios
        .put(
          `http://localhost:8000/api/posts/${userProfile._id}/posts/${postId}/likes`,
          newLike
        )
        .then(response => setLikes([...likes, newLike, response.data]))
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => fetchUser(), [userProfile])
  useEffect(() => getPosts(), [likes])

  return (
    <div>
      <h1>You are viewing another users profile</h1>
      {/* <button onClick={() => console.log(userProfile)}>log user</button> */}
      {/* <button onClick={() => console.log(user)}>logged in user</button> */}
      <h3>You are viewing {userProfile?.username}'s profile</h3>
      <>
        {displaySinglePost ? (
          <>
            {/* <Button onClick={() => setDisplaySinglePost(false)}>Go Back</Button> */}
            {/* <Button onClick={() => console.log(displayPost)}>Log Post</Button> */}
            <SinglePost
              key={user._id}
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
              <Post
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

// TODO: import getuser function from api
// const getUser = async () => {
//   try {
//     await axios
//     .get(api)
//     .then((response) => setUserProfile(response.data))
//   } catch (error) {
//     throw new Error(error)
//   }
// }
// useEffect(() => getUser(), [userProfile])
