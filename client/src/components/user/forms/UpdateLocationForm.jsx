import { useContext, useState } from 'react'
import axios from 'axios'
import {
  FormControl,
  Button,
  Container,
  TextField,
} from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import UserContext from '../../../context/UserContext'

export default function UpdateLocationForm() {
  const { user } = useContext(UserContext)
  const userId = user._id.toString()
  const [location, setLocation] = useState('')

  const handleUpdate = async () => {
    let update = {
      location: location,
      userId: userId
    }
    try {
      await axios
        .put(`http://localhost:8000/api/users/${userId}`, update)
        .then(update => {
          console.log(update)
        })
    } catch (error) {
      throw new Error(error)
    }
  }





  return (
    <Container>
      <FormControl>
        <form noValidate autoComplete='off' onSubmit={handleUpdate}>
          <TextField
            style={{ marginBottom: 20 }}
            onChange={e => setLocation(e.target.value)}
            label='Location'
            placeholder={user.location}
            variant='outlined'
            fullWidth
            required
          />

          <Button
            type='submit'
            color='secondary'
            variant='contained'
            endIcon={<UpdateIcon />}
          >
            Update Location
          </Button>
        </form>
      </FormControl>
    </Container>
  )
}
