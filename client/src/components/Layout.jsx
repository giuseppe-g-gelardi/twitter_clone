import { Container } from '@material-ui/core'
import '../Layout.css'
import Nav from './Nav'


export default function Layout ({ children }) {

  return (
    <Container>
      <Nav /> 
      <Container className='container'>{children}</Container>
    </Container>

  )
}

// {/* <>
// <Container>
  
//   <Grid container spacing={3} justify='space-around'>

//     <Grid item sx>
//       <Paper >LEFT</Paper>

//     </Grid>

//     <Grid item sx={4}>
//       <Paper>{children}</Paper>
//     </Grid>

//     <Grid item sx>
//       <Paper>RIGHT</Paper>
//     </Grid>

//   </Grid>
// </Container>
// </> */}
// const useStyles = makeStyles(theme => ({
//   page: {
//     width: '100%',
//     padding: theme.spacing(3)
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'left',
//   }
// }))
