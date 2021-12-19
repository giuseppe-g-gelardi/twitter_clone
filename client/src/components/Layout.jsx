import { Container, Grid, Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  page: {
    width: '100%',
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  }
}))

export default function Layout ({ children }) {
  const classes = useStyles()

  return (
    <Container className={classes.page}>
      <Grid container spacing={3} justify='space-around'>

        <Grid item sx>
          <Paper className={classes.paper}>LEFT</Paper>

        </Grid>

        <Grid item sx={4}>
          <Paper className={classes.paper}>{children}</Paper>
        </Grid>

        <Grid item sx>
          <Paper className={classes.paper}>RIGHT</Paper>
        </Grid>

      </Grid>
    </Container>
  )
}
