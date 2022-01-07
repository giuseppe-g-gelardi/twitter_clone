import { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { fetchUsers } from '../api/users.ts'
import UserCard from './UserCard'

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
              if (searchTerm === '') return val
              else if (
                searchString.toLowerCase().includes(searchTerm.toLowerCase())
              )
                return val
            })
            .map(user => (
              <UserCard key={user._id} user={user} />
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
