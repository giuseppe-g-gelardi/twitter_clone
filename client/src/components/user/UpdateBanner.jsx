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

export default function UpdateBanner() {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)
  const userId = user._id
  const [profileBanner, setProfileBanner] = useState('')

  const handleUpdate = async () => {
    let update = {
      profileBanner: profileBanner,
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
      Profile Picture: {
        user.profileBanner 
        ? user.profileBanner 
        : 'you have not set a banner image yet'
      }
      <IconButton onClick={() => setOpenPopup(true)}>
        <UpdateIcon style={{ color: '#89ddff' }} />
      </IconButton>
      <Controls.Popup
        text='Update Banner Image...'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Container>
          <FormControl>
            <form noValidate autoComplete='off' onSubmit={handleUpdate}>
              <TextField
                style={{ marginBottom: 20 }}
                onChange={e => setProfileBanner(e.target.value)}
                label='Bio'
                placeholder={user.profileBanner}
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
                Update Banner Image
              </Button>
            </form>
          </FormControl>
        </Container>
      </Controls.Popup>
    </Typography>
  )
}
