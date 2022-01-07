import { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { getUser } from '../api/users.ts'

export default function Reply(props) {
  const [replyUser, setReplyUser] = useState({})
  const { user, text, userPage } = props


  const fetchUser = async () => {
    try {
      const replyOwner = await getUser(user)
      setReplyUser(replyOwner)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => fetchUser(), [userPage])

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
      <Avatar src={replyUser?.profilePicture} />
    </div>
    <div style={{ flex: '1', padding: '10px' }}>
      <div className='post__header'>
        <div style={{ fontSize: '15px', marginBottom: '5px' }}>
          <h3 style={{ fontSize: '15px', marginBottom: '5px' }}>
            {user.username}{' '}
            <span
              style={{ fontWeight: '600', fontSize: '12px', color: 'gray' }}
            >
              {user.isVerified && (
                <VerifiedUserIcon
                  className='post__badge'
                  style={{ fontSize: '14px', color: 'blueviolet' }}
                />
              )}{' '}
              @{replyUser.username}
            </span>
          </h3>
        </div>
        <div style={{ marginBottom: '10px', fontSize: '15px' }}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

