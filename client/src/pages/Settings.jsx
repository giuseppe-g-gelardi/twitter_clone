import { useContext } from "react"

import UserContext from '../context/UserContext'
// import Followers from "../components/Followers"
// import Following from "../components/Following"

import UpdateTheme from "../components/user/components/UpdateTheme";
import UpdateEmail from "../components/user/components/UpdateEmail";
import UpdateName from "../components/user/components/UpdateName";
import UpdateUsername from "../components/user/components/UpdateUsername";
import UpdateLocation from "../components/user/components/UpdateLocation";
import UpdateBio from "../components/user/components/UpdateBio";

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
        <UpdateLocation />
        <UpdateBio />
        <h4>Followers: {user.followers.length}</h4>
        <h4>following: {user.following.length}</h4>
        {/* <Followers />
        <Following /> */}
        <h2>verified user: {user.isVerified ? 'verified' : 'you are not verified'}</h2>
        <h2>Profile Banner: {user.profileBanner ? user.profileBanner : 'you have not set a banner image yet'}
          {/* if image make src the pb string */}
        </h2>
        <h2>Profile Picture: {user.profilePicture ? user.profilePicture : 'you have not set a profile picture yet'}
          {/* if image make src the pp string */}
        </h2>
        <h2>Protected profile: {user.protected ? 'protected' : 'public'}</h2>

      </div>
    </div>
  )
}
