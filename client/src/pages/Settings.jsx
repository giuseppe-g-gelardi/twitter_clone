import { useContext } from "react"

import UserContext from '../context/UserContext'
import Followers from "../components/Followers"
import Following from "../components/Following"

import UpdateTheme from "../components/user/components/UpdateTheme";
import UpdateEmail from "../components/user/components/UpdateEmail";
import UpdateName from "../components/user/components/UpdateName";
import UpdateUsername from "../components/user/components/UpdateUsername";

export default function Settings() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>User settings</h1>
      <div>
        <h2>Member since: {user.createdAt}</h2>
        <UpdateEmail />
        <UpdateUsername />
        <UpdateName />
        <UpdateTheme />
        <Followers />
        <Following />
        <h2>verified user: {user.isVerified ? 'verified' : 'you are not verified'}</h2>
        <h2>Profile Banner: {user.profileBanner ? user.profileBanner : 'you have not set a banner image yet'}
        <h2>Location: {user.location ? user.location : 'you have not set your location'}</h2>
        <h2>Bio: {user.bio ? user.bio : 'you have not filled out your bio'}</h2>
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
