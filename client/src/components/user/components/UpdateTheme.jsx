import { useContext, useState } from 'react'
import { Typography, IconButton } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import Controls from '../../controls/Controls'
import UserContext from '../../../context/UserContext'
import UpdateUserTheme from '../forms/UpdateUserTheme'

export default function UpdateTheme () {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)

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
        <UpdateUserTheme />
      </Controls.Popup>
    </Typography>
  )
}
