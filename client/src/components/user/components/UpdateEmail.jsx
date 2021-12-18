import { useContext, useState } from 'react'
import { Typography, IconButton } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import UserContext from '../../../context/UserContext'

import Controls from '../../controls/Controls'
import UpdateEmailForm from '../forms/UpdateEmailForm'

export default function UpdateEmail () {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Typography>
      Email Address: {user.email}
      <IconButton onClick={() => setOpenPopup(true)}>
        <UpdateIcon style={{ color: '#89ddff' }} />
      </IconButton>
      <Controls.Popup
        text='Update email...'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateEmailForm />
      </Controls.Popup>
    </Typography>
  )
}
