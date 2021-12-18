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

export default function UpdateEmailForm () {
  const { user } = useContext(UserContext)
  const userId = user._id.toString()
  const [email, setEmail] = useState('')

  const handleUpdate = async () => {
    let update = {
      email: email,
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
            onChange={e => setEmail(e.target.value)}
            label='Email'
            placeholder={user.email}
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
            Update Email
          </Button>
        </form>
      </FormControl>
    </Container>
  )
}
