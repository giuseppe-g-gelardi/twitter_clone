import { useContext, useState } from "react"
import { Typography, IconButton } from "@material-ui/core"
import UpdateIcon from '@material-ui/icons/Update';

import Controls from "../../controls/Controls";
import UserContext from "../../../context/UserContext";

import UpdateUsernameForm from "../forms/UpdateUsernameForm";

export default function UpdateUsername() {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Typography>
      Username: {user.username}
 
      <IconButton onClick={() => setOpenPopup(true)}>
        <UpdateIcon style={{ color: '#89ddff' }} />
      </IconButton>
      <Controls.Popup
        text='Update name...'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdateUsernameForm />
      </Controls.Popup>
    </Typography>
  )
}
