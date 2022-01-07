import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { fetchUsers } from '../api/users.ts'
import { Avatar } from '@material-ui/core'

export default function SearchUsers () {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  // TODO get ALL users.
  // TODO return users.filter('search term')
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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f8fa',
          padding: '10px',
          borderRadius: '20px',
          marginTop: '10px',
          marginLeft: '20px'
        }}
      >
        <SearchIcon style={{ color: 'grey' }} />

        <input
          placeholder='search for a user'
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        borderBottom: '1px solid grey',
        paddingBottom: '10px'
      }}
      >

      <ul>


        {users
          .filter(val => {
            let searchString = ''
            for (let [key, value] of Object.entries(val)) {
              searchString += `${value}\t`
            }
            if (searchTerm === '') {
              return val
            } else if (
              searchString.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val
              }
            })
            
            .map(user => (
              <li key={user._id}>
              {/* // ! /users/:userid */}
              <Link to={`/users/${user._id}`}>
                <Avatar src={user.profilePicture} />{user.username}
              </Link>
            </li>
          ))}
      </ul>
          </div>
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
