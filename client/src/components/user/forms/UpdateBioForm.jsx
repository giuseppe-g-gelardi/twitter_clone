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

export default function UpdateBioForm() {
  const { user } = useContext(UserContext)
  const userId = user._id.toString()
  const [bio, setBio] = useState('')

  const handleUpdate = async () => {
    let update = {
      bio: bio,
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
            onChange={e => setBio(e.target.value)}
            label='Bio'
            placeholder={user.bio}
            variant='outlined'
            rows={4}
            fullWidth
            required
          />

          <Button
            type='submit'
            color='secondary'
            variant='contained'
            endIcon={<UpdateIcon />}
          >
            Update Bio
          </Button>
        </form>
      </FormControl>
    </Container>
  )
}
