import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function UserProfile() {
  const [user, setUser] = useState(null)
  const { id } = useParams()
  // 61baaced780cf3e51957becb // user@email.com's user._id
  const api = `http://localhost:8000/api/users/${id}`

  const getUser = async (id) => {
    try {

      await axios
        .get(api)
        .then((response) => setUser(response.data))
        


    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => getUser(), [])

  return (
    <div>

      <h1>You are viewing another users profile</h1>
      <button onClick={() => console.log(user)}>log user</button>
      <h3>You are user {user.username}'s profile</h3>
    </div>
  )
}
