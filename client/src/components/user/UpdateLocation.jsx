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

import UserContext from '../../context/UserContext'
import Controls from '../controls/Controls'

export default function UpdateLocation () {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)
  const userId = user._id
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
    <Typography>
      Location: {user.location}
      <IconButton onClick={() => setOpenPopup(true)}>
        <UpdateIcon style={{ color: '#89ddff' }} />
      </IconButton>
      <Controls.Popup
        text='Update location...'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
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
      </Controls.Popup>
    </Typography>
  )
}
