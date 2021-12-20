import { Link } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core';
import { FaExclamationTriangle } from 'react-icons/fa'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import '../Error.css'

export default function Error() {
  return (
    <Container>
      <Container className='error'>
        <Typography variant='h1' component='div' > <FaExclamationTriangle /> 404!</Typography>
        <h4> <SentimentVeryDissatisfiedIcon /> Sorry, there is nothing here for you <SentimentVeryDissatisfiedIcon /> </h4>
        <Link to='/home'>You dont have to go home but you can't stay here</Link>
      </Container>
    </Container>
  )
}
