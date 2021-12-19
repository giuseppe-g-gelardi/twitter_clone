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

export default function UpdateTheme () {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)
  const userId = user._id
  const [theme, setTheme] = useState('')

  const handleUpdate = async () => {
    let update = {
      theme: theme,
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
      Theme Preference: {user.theme}
      <IconButton onClick={() => setOpenPopup(true)}>
        <UpdateIcon style={{ color: '#89ddff' }} />
      </IconButton>
      <Controls.Popup
        text='Update theme...'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Container>
          <FormControl>
            <form noValidate autoComplete='off' onSubmit={handleUpdate}>
              <TextField
                style={{ marginBottom: 20 }}
                onChange={e => setTheme(e.target.value)}
                label='Change Theme'
                placeholder={user.theme}
                variant='outlined'
                autoWidth
                required
              />

              <Button
                type='submit'
                color='secondary'
                variant='contained'
                endIcon={<UpdateIcon />}
              >
                Change Theme
              </Button>
            </form>
          </FormControl>
        </Container>
      </Controls.Popup>
    </Typography>
  )
}
