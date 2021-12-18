import { useContext, useState } from 'react'
import axios from 'axios'
import { FormControl, Button, Container, TextField } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import UserContext from '../../context/UserContext'

export default function UpdateNameForm () {
  const { user } = useContext(UserContext)
  const userId = user._id.toString()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const handleUpdate = async () => {
    let update = {
      firstname,
      lastname,
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
            onChange={e => setFirstname(e.target.value)}
            label='First Name'
            placeholder={user.firstname}
            variant='outlined'
            fullWidth
            required
          />

          <TextField
            style={{ marginBottom: 20 }}
            onChange={e => setLastname(e.target.value)}
            label='First Name'
            placeholder={user.lastname}
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
