import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const getUserFromToken = () => {
    const token = localStorage.getItem('token')

    if (token) {
      const userid = jwtDecode(localStorage.getItem('token'))._id
 
      axios.get(`http://localhost:8000/api/users/${userid}`, 
        {headers: { 'x-auth-token': token }})
        .then(response => `${console.log(response.data)} ${setUser(response.data)}`)
        .catch(error => {console.log(`Axios error: `, error)})
    } else {
      return;
    }
  }

  useEffect(() => {
    getUserFromToken()
  }, [])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  return localStorage.getItem('token') ? true : false
}

export default UserContext
