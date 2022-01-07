import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { fetchUsers } from '../api/users.ts'


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

  const getRandom = (arr, n) =>{
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    console.log(result)
    setSuggested(result)
    return result;
}
  
  useEffect(() => getAllUsers(), [])
  // useEffect(() => getRandom(users, 3))
  // useEffect(() => suggestedUsersList())


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
        {/* <button onClick={() => suggestedUsersList()}>suggested</button> */}
        <button onClick={() => getRandom(users, 3)}>suggested function</button>
        <button onClick={() => console.log(suggested.map(user => user.username))}>suggested</button>
        {/* <div>
          {suggested.map(user => (
            <li>
              {user.username}
            </li>
          ))}
        </div> */}
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
