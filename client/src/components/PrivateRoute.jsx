import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const useAuth = () => {
    return localStorage.getItem('token') ? true : false
  }
  const auth = useAuth()
  return  auth ? children : <Navigate to='/login' />
}

