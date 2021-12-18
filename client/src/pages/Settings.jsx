import { useEffect, useState, useContext } from "react"
import axios from "axios"

import UserContext from '../context/UserContext'
import Followers from "../components/Followers"
import Following from "../components/Following"

export default function Settings() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>User settings</h1>
      <div>
        <h2>Member since: {user.createdAt}</h2>
        <h2>Email Address: {user.email}</h2>
        <h2>Username: {user.username}</h2>
        <h2>Firstname: {user.firstname ? user.firstname : 'you have not set your first name yet'}</h2>
        <h2>Lastname: {user.lastname ? user.lastname : 'you have not set your last name yet'}</h2>
        <h2>
          <Followers />
        </h2>
        <h2>
          <Following />
        </h2>
        <h2>admin status: {user.isAdmin ? 'You are not an administrator' : 'Admin'}</h2>
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
