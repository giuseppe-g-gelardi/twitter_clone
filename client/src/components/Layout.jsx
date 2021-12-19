import { Container, Grid, Paper } from '@material-ui/core'
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

export default function Layout ({ children }) {
  // const classes = useStyles()

  return (
    <>
    <Container>
      
      <Grid container spacing={3} justify='space-around'>

        <Grid item sx>
          <Paper >LEFT</Paper>

        </Grid>

        <Grid item sx={4}>
          <Paper>{children}</Paper>
        </Grid>

        <Grid item sx>
          <Paper>RIGHT</Paper>
        </Grid>

      </Grid>
    </Container>
    </>
  )
}
