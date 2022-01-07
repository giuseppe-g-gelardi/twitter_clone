import { Avatar } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { Link } from 'react-router-dom'

export default function UserCard ({ user }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        borderBottom: '1px solid grey',
        paddingBottom: '10px'
      }}
    >
      <div style={{ padding: '20px' }}>
        <Avatar src={user.profilePicture} />
      </div>
      <div style={{ flex: '1', padding: '10px' }}>
        <div className='post__header'>
          <div style={{ fontSize: '15px', marginBottom: '5px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '5px' }}>
              <Link to={`/users/${user._id}`}>{user.username} </Link>
              <span
                style={{ fontWeight: '600', fontSize: '12px', color: 'gray' }}
              >
                {user.isVerified && (
                  <VerifiedUserIcon
                    className='post__badge'
                    style={{ fontSize: '14px', color: 'blueviolet' }}
                  />
                )}{' '}
                @{user.username}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
