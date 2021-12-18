import { Navigate } from 'react-router-dom'

export const useAuth = () => {
  return localStorage.getItem('token') ? true : false
}

export default function PrivateRoute({ children }) {
  const auth = useAuth()
  return  auth ? children : <Navigate to='/' />
}

