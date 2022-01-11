import { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { following } from '../api/users.ts'
import UserCard from './UserCard'

export default function FollowingUsers () {
  const { user } = useContext(UserContext)
  const [followingUsers, setFollowingUsers] = useState([])

  useEffect(() => {
    if (!user._id) return
    following(user._id)
      .then(res => setFollowingUsers(res.data))
      .catch(err => err, 'error getting followers')
  }, [user])

  return (
    <div style={{ width: '50vh' }}>
      {followingUsers.map(user => (
        <UserCard user={user} key={user._id} />
      ))}
    </div>
  )
}
