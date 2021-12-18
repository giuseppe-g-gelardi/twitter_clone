import { useEffect } from 'react'
import { ThemeProvider, StylesProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

// import { darkTheme, lightTheme as theme } from './components/theme/Theme'
import { lightTheme as theme} from './components/theme/Theme'
import { UserProvider, useAuth } from './context/UserContext'
import Routing from './components/Routing'

export default function App() {
  const auth = useAuth()
  // const [darkMode, setDarkMode] = useState(false)
  // const [isAuth, setIsAuth] = useState(false)
  // const theme = darkMode ? darkTheme : lightTheme

  // const checkAuth = () => {
  //   const token = localStorage.getItem('token')
  //   setIsAuth(token !== null)
  //   console.log('is Auth: ', isAuth)
  // }

  // useEffect(() => {
  //   checkAuth()
  // }, [isAuth])

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
            <h1>app lol</h1>
            <Routing />
        </ThemeProvider>
      </StylesProvider>
    </UserProvider>
  )
}
