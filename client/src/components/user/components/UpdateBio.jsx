import { useContext, useState } from 'react'
import { Typography, IconButton } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import UserContext from '../../../context/UserContext'

import Controls from '../../controls/Controls'
import UpdateBioForm from '../forms/UpdateBioForm'

export default function UpdateBio() {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Typography>
      Bio: {user.bio}
      <IconButton onClick={() => setOpenPopup(true)}>
        <UpdateIcon style={{ color: '#89ddff' }} />
      </IconButton>
      <Controls.Popup
        text='Update Bio...'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateBioForm />
      </Controls.Popup>
    </Typography>
  )
}
