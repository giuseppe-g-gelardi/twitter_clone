// import { useEffect, useContext } from 'react'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, StylesProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

// import { darkTheme, lightTheme as theme } from './components/theme/Theme'
import { lightTheme as theme } from './components/theme/Theme'
import { UserProvider, useAuth } from './context/UserContext'
// import Routing from './components/Routing'

import Layout from './components/Layout'
import Home from './pages/Home'
import Error from './pages/Error'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

export default function App () {
  const auth = useAuth()
  // const [darkMode, setDarkMode] = useState(false)
  // const [isAuth, setIsAuth] = useState(false)
  // const theme = darkMode ? darkTheme : lightTheme

  const checkAuth = () => {
    console.log('is Auth: ', auth)
  }

  useEffect(() => {
    checkAuth()
  }, [auth])

  return (
    <UserProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Routes>
              <Route path='/' element={<Home />}>
                <Route path='/:userid' element={<Profile />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </StylesProvider>
    </UserProvider>
  )
}
// TODO update this to use username instead of id
// <Route path='/:username' element={<Profile />} />
