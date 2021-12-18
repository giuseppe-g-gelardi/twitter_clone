import { createTheme } from '@material-ui/core/styles'

const baseTheme = createTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
})

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },

  },  
})

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'dark',
    primary: {
      main: '#f50057'
    },
    secondary: {
      main: '#3f51b5'
    }
  },
})

export { lightTheme, darkTheme }
