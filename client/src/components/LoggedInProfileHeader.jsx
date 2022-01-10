import { useContext } from 'react'
import { Avatar } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import MyLocationIcon from '@mui/icons-material/MyLocation'

import UserContext from '../context/UserContext'

export default function LoggedInProfileHeader () {
  // const profilepicture = user.profilePicture

  const { user } = useContext(UserContext)
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflowY: 'auto',
        scrollbarWidth: 'none'
      }}
    >
      <div
        style={{
          flexShrink: '0',
          width: '100%',
          height: 'min(33vw, 199px)',
          position: 'relative',
          background: '#f5f8fa'
          // background: 'grey',
          // borderRadius: '25px'
        }}
      >
        <Avatar
          src={user.profilePicture}
          style={{
            width: '135px',
            height: '135px',
            border: 'solid 3.75px',
            borderRadius: '50%',
            position: 'absolute',
            bottom: 'max(-60px, -10vw)',
            left: '15px'
          }}
        />
      </div>

      <div
        style={{
          padding: 'min(calc(10vw, + 7px), 67px) 16px 0',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <h1 style={{ fontWeight: 'bold', fontSize: '19px' }}>
          {user.firstname ? user.firstname : ''}{' '}{user.lastname ? user.lastname : ''}
          {user.isVerified && (
            <VerifiedUserIcon
              className='post__badge'
              style={{ fontSize: '14px', color: 'blueviolet' }}
            />
          )}{' '}
        </h1>
        <h2 style={{ fontWeight: 'normal', fontSize: '15px', color: 'gray' }}>
          @{user.username}
        </h2>

        <p style={{ fontSize: '15px', marginTop: '11px' }}>
          {user.bio ? user.bio : ''}
        </p>

        <ul
          style={{ listStyle: 'none', marginTop: '10px', marginBottom: '10px' }}
        >
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '15px',
              color: 'gray'
            }}
          >
            <MyLocationIcon /> {user.location ? user.location : 'the Interwebs'}
          </li>
        </ul>

        <div style={{ display: 'block' }}>
          <span style={{ fontSize: '15px', color: 'gray' }}>
            <strong>{user.posts?.length} Posts, </strong>
          </span>

          <span style={{ fontSize: '15px', color: 'gray' }}>
            <strong>{user.followers?.length}</strong> Followers
          </span>
        </div>
      </div>
    </div>
  )
}
