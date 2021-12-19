import { useContext, useState } from 'react'
import axios from 'axios'
import {
  Typography,
  IconButton,
  FormControl,
  Button,
  Container,
  TextField
} from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import Controls from '../controls/Controls'
import UserContext from '../../context/UserContext'

export default function UpdateName () {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)
  const userId = user._id
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
    <Typography>
      name:{' '}
      {user.firstname + ' ' + user.lastname
        ? user.firstname + ' ' + user.lastname
        : 'You have not set your name yet'}
      <IconButton onClick={() => setOpenPopup(true)}>
        <UpdateIcon style={{ color: '#89ddff' }} />
      </IconButton>
      <Controls.Popup
        text='Update name...'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
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
                label='Last Name'
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
      </Controls.Popup>
    </Typography>
  )
}
