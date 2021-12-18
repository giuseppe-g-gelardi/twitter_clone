import { useContext, useState } from 'react'
import axios from 'axios'
import { Typography, ButtonGroup, IconButton } from '@material-ui/core'
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import UserContext from '../../context/UserContext'

export default function UpdateUserTheme() {
  const { user } = useContext(UserContext)
  const userId = user._id
  const [theme, setTheme] = useState('')

// TODO FIX

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
    <>
    <Typography variant='h4'>
      Theme Preference: {"   "}
      <ButtonGroup variant='contained'>

        <IconButton onClick={e => `${setTheme('light')}${handleUpdate}${console.log(user)}`}>
          <Brightness7Icon />
        </IconButton>
        <IconButton onClick={e => `${setTheme('dark')}${handleUpdate}${console.log(user)}`}>
          <NightsStayIcon />
        </IconButton>


      </ButtonGroup>
    </Typography>
      
    </>
  )
}

