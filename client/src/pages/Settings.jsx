import { useContext } from "react"

import UserContext from '../context/UserContext'
import UpdateTheme from "../components/user/UpdateTheme";
import UpdateEmail from "../components/user/UpdateEmail";
import UpdateName from "../components/user/UpdateName";
import UpdateUsername from "../components/user/UpdateUsername";
import UpdateLocation from "../components/user/UpdateLocation";
import UpdateBio from "../components/user/UpdateBio";
import UpdatePicture from "../components/user/UpdatePicture";
import UpdateBanner from "../components/user/UpdateBanner";
import DeleteAccount from "../components/user/DeleteAccount";

export default function Settings() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>User settings</h1>
      <div>
        <h2>Member since: {user.createdAt}</h2>
        <h4>Followers: {user?.followers?.length}</h4>
        <h4>following: {user?.following?.length}</h4>
        <UpdateEmail />
        <UpdateUsername />
        <UpdateName />
        <UpdateTheme />
        <UpdateLocation />
        <UpdateBio />
        <UpdateBanner />
        <UpdatePicture />
        <h2>verified user: {user.isVerified ? 'verified' : 'you are not verified'}</h2>
        <h2>Protected profile: {user.protected ? 'protected' : 'public'}</h2>
        <DeleteAccount />
      </div>
    </div>
  )
}
