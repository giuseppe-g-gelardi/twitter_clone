import '../Layout.css'
// import Nav from './Nav'
import Sidebar from './Sidebar'
import Widgets from '../Widgets'

export default function Layout ({ children }) {

  return (

    <div style={{ display: 'flex', height: '100vh', maxWidth: '1300px', marginLeft: 'auto', marginRight: 'auto', padding: '10px' }}>
    {/* <Nav />  */}

      <div className='sidebar-left'>
      <Sidebar />
      </div>
      <div className='main-content'>
      {children}
      </div>
      <div className='sidebar-right'>
      {/* 3 random users to follow */}
      {/* search filter for all users */}
      <Widgets />
      </div>

    </div>

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
