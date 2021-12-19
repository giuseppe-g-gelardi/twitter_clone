import { useContext } from "react"

import UserContext from '../context/UserContext'
// import Followers from "../components/Followers"
// import Following from "../components/Following"

import UpdateTheme from "../components/user/UpdateTheme";
import UpdateEmail from "../components/user/UpdateEmail";
import UpdateName from "../components/user/UpdateName";
import UpdateUsername from "../components/user/UpdateUsername";
import UpdateLocation from "../components/user/UpdateLocation";
import UpdateBio from "../components/user/UpdateBio";

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
        <h4>Followers: {user?.followers?.length}</h4>
        <h4>following: {user?.following?.length}</h4>
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
