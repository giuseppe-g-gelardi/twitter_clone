import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchUsers } from "../api/users.ts"

export default function SearchUsers() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
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



  useEffect(() => getAllUsers(), [])

  return (
    <div>
      <h1>Search for users</h1>
      <h3>display all users</h3>
      <input 
        placeholder="search for a user"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {users.filter(val => {
        let searchString = ''
        for (let [key, value] of Object.entries(val)) {
          searchString += `${value}\t`
        }
        if (searchTerm === '') {
          return val
        } else if (
          searchString
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          return val
        }
      })
        
        .map(user => (
          <li key={user._id}>
            {/* // ! /users/:userid */}
            <Link to={`/users/${user._id}`}>
              {user.username}
            </Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

  // .filter(val => {
  //   let searchString = ''
  //   for (let [key, value] of Object.entries(val)) {
  //     searchString += `${value}\t`
  //   }
  //   if (searchTerm === '') {
  //     return val
  //   } else if (
  //     searchString
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  //   ) {
  //     return val
  //   }
  // })
