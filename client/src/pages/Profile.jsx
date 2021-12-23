import { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import CommentCard from '../components/CommentCard'
import { Container } from '@material-ui/core'

export default function Profile() {
  const { userid } = useParams()
  const [user, setUser] = useState({})

  // http://localhost:8000/api/users/${userId}
  // 61c3877efbe070508dc0d2c0

  // const getUser = async () => {
  //   try {
  //     await axios
  //       .get(`http://localhost:8000/api/users/61c3877efbe070508dc0d2c0`)
  //       .then((response) => `${setUser(response.data)}${console.log(user)}`)
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }

  const getUser = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/users/${userid}`)
        .then((response) => `${setUser(response.data)}${console.log(user)}`)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => getUser(), [])



  return (
    <div>
      <h1>Profile page test...</h1>
      <button onClick={() => console.log(user)}>LOG users id for this page</button>

      <h1>hi! im {user.username}</h1>
      <p>you can call me {user.firstname}</p>
      <p>i live in {user.location}</p>
      <h3>bio: {user.bio}</h3>
      <Container>
          <h2>my posts: </h2>
          {user?.posts?.map(post => (
            <CommentCard
              key={post._id}
              user={user}
              post={post}
              // deletePost={deletePost}
              // setDisplaySinglePost={setDisplaySinglePost}
              // setDisplayPost={setDisplayPost}
              // likeUnlike={likeUnlike}
            />
          ))}
        </Container>
    </div>
  )
}
