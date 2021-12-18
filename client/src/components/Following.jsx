import { useEffect, useState, useContext } from "react"
import axios from "axios"
import UserContext from '../context/UserContext'

export default function Following() {
  const { user } = useContext(UserContext)
  const [following, setFollowing] = useState([])

  const getFollowing = () => {
    user.following?.map(async follows => {
      let response = await axios.get(
        `http://localhost:8000/api/users/${follows}`
      )
      setFollowing(following => [following, response.data])
    })
    console.log('following: ', following)
    return following
  }

  useEffect(() => {
    getFollowing()
  }, [user])

  return (
    <>
      Following: {following 
        ? following?.map(follow => (
          <ul key={follow._id}>
            <li key={follow._id}>{follow.username}</li>
          </ul>
          )) 
        : 'You arent following anyone'}
    </>
  )
}
