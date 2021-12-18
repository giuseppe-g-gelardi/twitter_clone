import { useContext, useState } from 'react'
import axios from 'axios'
import { FormControl, Button, Container, TextField } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import UserContext from '../../../context/UserContext'

export default function UpdateUsernameForm() {
  const { user } = useContext(UserContext)
  const userId = user._id.toString()

  const [username, setUsername] = useState('')

  const handleUpdate = async () => {
    let update = {
      username,
      userId
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
            onChange={e => setUsername(e.target.value)}
            label='Username'
            placeholder={user.firstname}
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
            Update Name
          </Button>
        </form>
      </FormControl>
    </Container>
  )
}
