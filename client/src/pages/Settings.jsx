import { useContext } from "react"

import UserContext from '../context/UserContext'

export default function Settings() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>User settings</h1>
      <div>
        <h2>
          Member since: {user.createdAt}
        </h2>
        <h2>
          Email Address: {user.email}
        </h2>
        <h2>
          Username: {user.username}
        </h2>
        <h2>
          Firstname: {user.firstname ? user.firstname : 'you have not set your first name yet'}
        </h2>
        <h2>
          Lastname: {user.lastname ? user.lastname : 'you have not set your last name yet'}
        </h2>
        <h2>
          followers: {user.followers?.length > 0
            ? user.followers?.map(follower => (
              <ul key={follower}>
                <li>
                  {follower}
                </li>
              </ul>
            )) 
            : 'You have no followers'
          
          }
        </h2>
        <h2>
          following: {user.following?.length > 0
          
            ? user.following?.map(follow => (
              <ul key={follow}>
                <li>{follow}</li>
              </ul>
            ))
            : `You're not following anyone`
          }
        </h2>
        <h2>
          admin status: {user.isAdmin ? 'You are not an administrator' : 'Admin'}
        </h2>
        <h2>
          verified user: {user.isVerified ? 'verified' : 'you are not verified'}
        </h2>
        <h2>
          Profile Banner: {user.profileBanner ? user.profileBanner : 'you have not set a banner image yet'}
          {/* if image make src the pb string */}
        </h2>
        <h2>
          Profile Picture: {user.profilePicture ? user.profilePicture : 'you have not set a profile picture yet'}
          {/* if image make src the pp string */}
        </h2>
        <h2>
          Protected profile: {user.protected ? 'protected' : 'public'}
        </h2>
        <h2>
          Theme preference: {user.theme === 'light' ? 'light theme' : 'dark theme'}
        </h2>
      </div>
    </div>
  )
}
