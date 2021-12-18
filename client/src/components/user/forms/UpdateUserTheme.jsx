import { useContext, useState } from 'react'
import axios from 'axios'
import { FormControl, Button, Container, TextField } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import UserContext from '../../../context/UserContext'

export default function UpdateUserTheme() {
  const { user } = useContext(UserContext)
  const userId = user._id
  const [theme, setTheme] = useState('')

  const handleUpdate = async () => {
    let update = {
      "theme": theme,
      "userId": userId
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
  )
}

