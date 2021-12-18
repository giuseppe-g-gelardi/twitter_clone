import { useContext, useState } from "react"
import { Typography, IconButton } from "@material-ui/core"
import UpdateIcon from '@material-ui/icons/Update';

import Controls from "../../controls/Controls";
import UserContext from "../../../context/UserContext";

import UpdateNameForm from "../forms/UpdateNameForm";

export default function UpdateName () {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Typography>
      name:{' '}
      {user.firstname + ' ' + user.lastname
        ? user.firstname + ' ' + user.lastname
        : 'You have not set your name yet'}
      <IconButton onClick={() => setOpenPopup(true)}>
        <UpdateIcon style={{ color: '#89ddff' }} />
      </IconButton>
      <Controls.Popup
        text='Update name...'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateNameForm />
      </Controls.Popup>
    </Typography>
  )
}
