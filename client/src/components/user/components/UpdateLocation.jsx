import { useContext, useState } from 'react'
import { Typography, IconButton } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import UserContext from '../../../context/UserContext'

import Controls from '../../controls/Controls'
import UpdateLocationForm from '../forms/UpdateLocationForm'

export default function UpdateLocation() {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)


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
        <UpdateLocationForm />
      </Controls.Popup>
    </Typography>
  )
}

