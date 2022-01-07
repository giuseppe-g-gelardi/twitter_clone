import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchUsers } from "../api/users.ts"

export default function Search() {
  const [users, setUsers] = useState([])
  // TODO get ALL users.
  // TODO return users.filter('search term")
  // TODO THEN map

  const getAllUsers = async () => {
    try {
      const res = await fetchUsers()
      setUsers(res)

    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => getAllUsers(), [users])

  return (
    <div>
      <h1>Search for users</h1>
      <h3>display all users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {/* /users/:userid */}
            <Link to={`/users/${user._id}`}>
              {user.username}
            </Link>
            </li>
        ))}
      </ul>
    </div>
  )
}
