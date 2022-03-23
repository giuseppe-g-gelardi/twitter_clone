import { useContext, useState } from 'react'
import {
  Typography,
  Button,
  Container,
} from '@material-ui/core'

import UserContext from '../../context/UserContext'
import Controls from '../controls/Controls'
import { deleteUser } from '../../api/users.ts'
import axios from 'axios'

export default function DeleteAccount () {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)

  const handleDelete = async () => {
    let options = {
      userId: user._id
    }

    try {
      axios.delete(`http://localhost:8000/api/users/${user._id}`, options)
        .then(localStorage.removeItem('token'))
        .catch(err => alert(err, 'unable to delete?'))
        window.location.reload()
    } catch (err) {
      console.log(err, 'unable to delete account')
    }
  }

  return (
    <Typography>
      <Button
        variant='contained'
        style={{ backgroundColor: 'red', color: 'white' }}
        onClick={() => setOpenPopup(true)}
      >
        Delete Account
      </Button>

      <Controls.Popup
        text='This is irreversible! Are you sure you want to delete your account?'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Container>
          <Button
            fullWidth={true}
            variant='contained'
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => handleDelete()}
          >
            Yes, delete my account
          </Button>
        </Container>
      </Controls.Popup>
    </Typography>
  )
}

// http://localhost:8000/api/users/61baab02780cf3e51957bebf
