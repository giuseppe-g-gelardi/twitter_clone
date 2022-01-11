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

  const useAuth = () => {
    return localStorage.getItem('token') ? true : false
  }

  const auth = useAuth()

  useEffect(() => {
    fetchUsers()
      .then(res => setUsers(res.data))
      .catch(err =>
        console.log(
          err,
          'error fetching all users in suggested users component'
        )
      )
  }, [suggested])

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

  // ! this calls the above function every X seconds. turn off for dev.
  useEffect(() => {
    function timer () {
      return setTimeout(() => getRandom(users, 3), 3000)
    }
    fetchUsers()
    timer()
  }, [suggested])

  const authDisplay = (
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

        <div>
          <ul>
            {suggested.map(user => (
              <UserCard key={user._id} user={user} />
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

  const noAuthDisplay = null

  return (
    <div
      style={{
        borderRight: '1px solid var(--blue)',
        flex: '0.3',
        marginTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}
    >
      {auth ? authDisplay : noAuthDisplay}
    </div>
  )
}
