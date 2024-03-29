import { useState, useEffect } from 'react'
import { Avatar, Button } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { getUser, follow } from '../api/users.ts'
import { useParams } from 'react-router-dom'

export default function UserInProfileHeader ({ loggedInUser }) {
  const { id } = useParams()
  const [user, setUser] = useState([])

  useEffect(() => {
    getUser(id).then(res => setUser(res.data)).catch(err => console.log(err, 'error fetching user in userprofileheader component'))
  }, [id])

  const handleFollow = () => {
    const follower = { userid: loggedInUser._id }
    follow(id, follower).then(res => console.log(res, res.data)).catch(err => console.log(err, 'err bruh!', err.message))
  }

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
          }}
        >
          <Avatar
            src={user?.profilePicture ? user?.profilePicture : null}
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
            {user?.firstname ? user.firstname : ''}{' '}
            {user?.lastname ? user.lastname : ''}
            {user?.isVerified && (
              <VerifiedUserIcon
                className='post__badge'
                style={{ fontSize: '14px', color: 'blueviolet' }}
              />
            )}{' '}
          </h1>
          <Button
              // onClick={() => getRandom(users, 3)}
              onClick={() => handleFollow()}
              type='submit'
              style={{
                backgroundColor: 'blueviolet',
                border: 'none',
                color: 'white',
                fontWeight: '900',
                textTransform: 'inherit',
                borderRadius: '30px',
                width: 'auto',
                height: '40px',
                marginTop: '20px',
                marginLeft: 'auto'
              }}
            >
              follow/unfollow
            </Button>
            <h2
              style={{ fontWeight: 'normal', fontSize: '15px', color: 'gray' }}
            >
              @{user?.username}
            </h2>

          <p style={{ fontSize: '15px', marginTop: '11px' }}>
            {user.bio ? user.bio : ''}
          </p>

          <ul
            style={{
              listStyle: 'none',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
                color: 'gray'
              }}
            >
              <MyLocationIcon />{' '}
              {user.location ? user.location : 'the Interwebs'}
            </li>
          </ul>

          <div style={{ display: 'block' }}>
            <span style={{ fontSize: '15px', color: 'gray' }}>
              <strong>{user.posts?.length} Posts, </strong>
              <strong>{' '}{user.following?.length}{' '}Following,</strong> 
              <strong>{' '}{user.followers?.length}{' '}Followers</strong>
            </span>
          </div>
        </div>
      </div>
  )
}

  // const fetchUser = () => {
  //   getUser(id).then(res => setUser(res.data)).catch(err => console.log(err, 'error fetching user in userprofileheader component'))
  // }

  // useEffect(() => fetchUser(), [id])
