import { useContext, useState } from "react"
import { Typography, IconButton } from "@material-ui/core"
import UpdateIcon from '@material-ui/icons/Update';

import Controls from '../components/controls/Controls'
import UserContext from '../context/UserContext'
import Followers from "../components/Followers"
import Following from "../components/Following"

import UpdateEmailForm from "../components/user/UpdateEmailForm";
import UpdateNameForm from "../components/user/UpdateNameForm";

export default function Settings() {
  const { user } = useContext(UserContext)
  const [openPopup, setOpenPopup] = useState(false)


  return (
    <div>
      <h1>User settings</h1>
      <div>
        <h2>Member since: {user.createdAt}</h2>
        <Typography>Email Address: {user.email}

              <IconButton onClick={() => setOpenPopup(true)}>
                <UpdateIcon style={{color: '#89ddff'}}/>
              </IconButton>

              <Controls.Popup
                text='Update email...'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <UpdateEmailForm />
              </Controls.Popup>
        
        </Typography>
        <h2>Username: {user.username}</h2>
        <Typography>
          name: {(
              user.firstname + " " + user.lastname 
            ? user.firstname + " " + user.lastname
            : 'You have not set your name yet'
            )}
          <IconButton onClick={() => setOpenPopup(true)}>
                <UpdateIcon style={{color: '#89ddff'}}/>
              </IconButton>

              <Controls.Popup
                text='Update name...'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <UpdateNameForm />
              </Controls.Popup>
        </Typography>
        <h2>
          <Followers />
        </h2>
        <h2>
          <Following />
        </h2>
        <h2>verified user: {user.isVerified ? 'verified' : 'you are not verified'}</h2>
        <h2>Profile Banner: {user.profileBanner ? user.profileBanner : 'you have not set a banner image yet'}
          {/* if image make src the pb string */}
        </h2>
        <h2>Profile Picture: {user.profilePicture ? user.profilePicture : 'you have not set a profile picture yet'}
          {/* if image make src the pp string */}
        </h2>
        <h2>Protected profile: {user.protected ? 'protected' : 'public'}</h2>
        <h2>Theme preference: {user.theme === 'light' ? 'light theme' : 'dark theme'}</h2>
      </div>
    </div>
  )
}
