import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, StylesProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

// import { darkTheme, lightTheme } from './components/theme/Theme'
import { lightTheme as theme } from './components/theme/Theme'
// import { darkTheme as theme } from './components/theme/Theme'
import { UserProvider, useAuth } from './context/UserContext'

import Layout from './components/Layout'
import Home from './pages/Home'
import Error from './pages/Error'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import UserProfile from './components/UserProfile'
import Following from './pages/Following'
import FollowingFeed from './components/FollowingFeed'
import Search from './pages/Search'
import Fray from './pages/Fray'
import PrivateRoute from './components/PrivateRoute'
import './globals.css'

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
              <Route
                path='/home'
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />

              <Route
                path='/following'
                element={
                  <PrivateRoute>
                    <Following />
                  </PrivateRoute>
                }
              />

              <Route
                path='/feed'
                element={
                  <PrivateRoute>
                    <FollowingFeed />
                  </PrivateRoute>
                }
              />

              <Route
                path='/fray'
                element={
                  <PrivateRoute>
                    <Fray />
                  </PrivateRoute>
                }
              />

              <Route
                path='/users'
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              >
                <Route
                  path='/users/:id'
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route
                path='/settings'
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path='/search'
                element={
                  <PrivateRoute>
                    <Search />
                  </PrivateRoute>
                }
              />

              <Route path='*' element={<Error />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </StylesProvider>
    </UserProvider>
  )
}

{
  /* <Routes>
              <Route
                path='/'
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              >
                
                <Route
                  path='/:userid'
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route
                path='/users'
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              >
                <Route
                  path='/users/:id'
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route
                path='/settings'
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path='/search'
                element={
                  <PrivateRoute>
                    <Search />
                  </PrivateRoute>
                }
              />


              <Route path='*' element={<Error />} />
            </Routes> */
}
