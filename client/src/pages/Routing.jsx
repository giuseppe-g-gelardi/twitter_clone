import { Routes, Route } from 'react-router-dom'

// import PrivateRoute from '../components/PrivateRoute'


import Landing from './Landing'
import Home from './Home'
import Error from './Error'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import Settings from './Settings'



export default function Routing() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}
