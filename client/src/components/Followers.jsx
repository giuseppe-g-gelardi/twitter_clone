import { useEffect, useState, useContext } from "react"
import axios from "axios"
import UserContext from '../context/UserContext'

export default function Followers() {
  const { user } = useContext(UserContext)
  const [followers, setFollowers] = useState([])

  const getFollowers = () => {
    user.followers?.map(async follow => {
      let response = await axios.get(
        `http://localhost:8000/api/users/${follow}`
      )
      setFollowers(followers => [followers, response.data])
    })
    // console.log('followers: ', followers)
    return followers
  }

  useEffect(() => {
    getFollowers()
  }, [user])

  return (
    <>
      Followers: {followers 
        ? followers?.map(follow => (
          <ul key={follow._id}>
            <li key={follow._id}>{follow.username}</li>
          </ul>
          )) 
        : 'You dont have any followers'}
    </>
  )
}
