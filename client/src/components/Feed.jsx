import { useContext } from 'react'

import { UserContext } from '../context/UserContext'

export default function Feed() {
  const { user } = useContext(UserContext)
  return (
    <div>
      <button onClick={() => console.log(user)}>log user</button>
    </div>
  )
}
