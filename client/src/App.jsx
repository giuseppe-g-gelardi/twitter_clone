import { useState, useEffect } from 'react'
import { ThemeProvider, StylesProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

import { darkTheme, lightTheme } from './components/theme/Theme'
import { UserProvider } from './context/UserContext'
import Routing from './pages/Routing'


export default function App() {

  const [darkMode, setDarkMode] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const theme = darkMode ? darkTheme : lightTheme

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    setIsAuth(token !== null)
    console.log('is Auth: ', isAuth)
  }

  useEffect(() => {
    checkAuth()
  }, [isAuth])

  return (
    <UserProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <h1>app lol</h1>
            <Routing />
        </ThemeProvider>
      </StylesProvider>
    </UserProvider>
  )
}
