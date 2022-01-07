import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Container } from '@material-ui/core'

import UserContext from '../context/UserContext'
import CommentCard from './CommentCard'
import CommentDisplay from './CommentDisplay'

export default function UserProfile() {
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
  // TODO verify create reply is working
  // TODO fix single comment view infinite rerender
  // // ! find out why likes arent happening live // ! LIKES HAPPENING LIVE!!
  // TODO consolidate comment card and comment display into one component
  // TODO start getting rid of unused/unnecessary components
  // TODO this replaces "profile," go through and get rid of whatever isnt needed
  // TODO keep doing great things
  // TODO 


  
  const getUser = async () => {
    try {
      
      await axios
      .get(api)
      .then((response) => setUserProfile(response.data))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  const getPosts = async () => {
    try {
      await axios
      .get(`http://localhost:8000/api/posts/${id}/posts`)
      .then(response => setPosts(response.data))
      // console.log(posts)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  const likeUnlike = async postId => {
    let newLike = {
      userId: user._id
    }
    try {
      await axios.put(`http://localhost:8000/api/posts/${userProfile._id}/posts/${postId}/likes`, newLike)
      .then(response => setLikes([...likes, newLike, response.data]))
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => getUser(), [userProfile])
  useEffect(() => getPosts(), [likes])
  
  return (
    <div>
      <h1>You are viewing another users profile</h1>
      <button onClick={() => console.log(userProfile)}>log user</button>
      <button onClick={() => console.log(user)}>logged in user</button>
      <h3>You are viewing {userProfile?.username}'s profile</h3>
      <>
      {displaySinglePost ? (
        <>
          <Button onClick={() => setDisplaySinglePost(false)}>Go Back</Button>
          <Button onClick={() => console.log(displayPost)}>Log Post</Button>
          <Container>
            <CommentDisplay
              key={user._id}
              user={userProfile}
              post={displayPost}
              setDisplaySinglePost={setDisplaySinglePost}
              likeUnlike={likeUnlike}
            />
          </Container>
        </>
      ) : (
        <Container>
          <h2>my posts: </h2>
          {posts.map(post => (
            <CommentCard
              key={post._id}
              user={userProfile}
              post={post}
              setDisplaySinglePost={setDisplaySinglePost}
              setDisplayPost={setDisplayPost}
              likeUnlike={likeUnlike}
            />
          ))}
        </Container>
      )}
    </>

    </div>
  )
}
{/* <CommentCard
key={post._id}
user={user}
post={post}
setDisplaySinglePost={setDisplaySinglePost}
setDisplayPost={setDisplayPost}
likeUnlike={likeUnlike}
/> */}

{/* <ul key={post._id}>
<li>{post.description}</li>
</ul> */}
      {/* {posts && (
        posts.map(post => (
          <CommentCard
            key={post._id}
            user={userProfile}
            post={post}
            likeUnlike={likeUnlike}
            setDisplaySinglePost={setDisplaySinglePost}
            setDisplayPost={setDisplayPost}
          />
        ))
      )} */}
