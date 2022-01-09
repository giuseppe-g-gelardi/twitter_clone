import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Button } from '@material-ui/core'
import { fetchUsers } from '../api/users.ts'
import UserCard from './UserCard'

// TODO fix link to suggested users profile

export default function SuggestedUsers () {
  const { user } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [suggested, setSuggested] = useState([])

  const getAllUsers = async () => {
    try {
      const res = await fetchUsers()
      setUsers(res)
    } catch (error) {
      throw new Error(error)
    }
  }

  const getRandom = async (arr, n) => {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len)
    if (n > len)
      throw new RangeError('getRandom: more elements taken than available')
    while (n--) {
      let x = Math.floor(Math.random() * len)
      result[n] = arr[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    console.log(result)
    setSuggested([...result])
  }

  // useEffect(() => {
  //   function timer () {
  //     const reset = setTimeout(() => getRandom(users, 3), 10000)
  //     return reset
  //   }
  //   getAllUsers()
  //   timer()
  // }, [suggested])

  useEffect(() => getAllUsers())

  return (
    <div style={{ flex: '0.3' }}>
      <div
        style={{
          marginTop: '15px',
          marginLeft: '20px',
          padding: '20px',
          backgroundColor: '#f5f8fa',
          borderRadius: '20px'
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '800' }}>
          What's happening {user.username}?
        </h2>
        <h4 style={{ fontSize: '12px', fontWeight: '600' }}>
          Check out these profiles:{' '}
        </h4>
          <div key={suggested._id}>
        <ul key={suggested._id}>
          {suggested.map(user => (
            <UserCard key={suggested._id} user={user} />
            ))}
          <Button
            onClick={() => getRandom(users, 3)}
            type='submit'
            style={{
              backgroundColor: 'blueviolet',
              border: 'none',
              color: 'white',
              fontWeight: '900',
              textTransform: 'inherit',
              borderRadius: '30px',
              width: '80px',
              height: '40px',
              marginTop: '20px',
              marginLeft: 'auto'
            }}
            >
            See more
          </Button>
        </ul>
            </div>
      </div>
    </div>
  )
}

// {/* <div
//   style={{
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: '#f5f8fa',
//     padding: '10px',
//     borderRadius: '20px',
//     marginTop: '10px',
//     marginLeft: '20px'
//   }}
// >
//   {/* <SearchIcon style={{ color: 'grey' }} /> */}
//   {/* <input placeholder='Search Twitter' type='text' /> */}
// {/* </div> */}
// <li key={user._id}>
//   <Link to={`/users/${user._id}`}>{user.username}</Link>
// </li>
// function timer () {
//   const reset = setTimeout(() => getRandom(users, 3), 10000)
//   return reset
// }

// useEffect(() => getAllUsers(), [])
// useEffect(() => timer(), [timer])
