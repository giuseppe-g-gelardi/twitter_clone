import { Routes, Route } from 'react-router-dom'

// import PrivateRoute from '../components/PrivateRoute'
import Layout from './Layout'

import Landing from '../pages/Landing'
import Home from '../pages/Home'
import Error from '../pages/Error'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Settings from '../pages/Settings'

export default function Routing () {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Layout>
  )
}
