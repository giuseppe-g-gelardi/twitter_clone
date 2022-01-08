import { Avatar } from "@material-ui/core"
import { useEffect, useState } from "react"
import { getUser } from "../api/users.ts"

export default function ProfileHeader ({ id }) {
  const [user, setUser] = useState({})
  const profilepicture = user.profilePicture

  const fetchUser = async () => {
    try {
      let profileUser = await getUser(id)
      setUser(profileUser)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => fetchUser())

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
          src={profilepicture}
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
          {/* Lucas Bicalho */}
          {/* {name ? name : user.username} */}
          {user.firstname ? user.firstname : ''}


          </h1>
        <h2 style={{ fontWeight: 'normal', fontSize: '15px', color: 'gray' }}>
          @{user.username}
        </h2>

        <p style={{ fontSize: '15px', marginTop: '11px' }}>
          {user.bio ? user.bio : ''}
          {/* Computer Science student at{' '}
          <a
            style={{ textDecoration: 'none', color: 'black' }}
            href='http://www.uff.br/'
          >
            @UFF
          </a> */}
        </p>

        {/* 
      > svg {
        fill: var(--gray);
        margin-right: 5px;
`; */}

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
            {/* <LocationIcon /> */}
            {user.location ? user.location : ''}
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '15px',
              color: 'gray'
            }}
          >
            {/* <CakeIcon /> */}

          Birthday?
          </li>
        </ul>

        {/* 
    & + span {
      margin-left: 20px;
    }
  }
`; */}

        <div style={{ display: 'block' }}>
          <span style={{ fontSize: '15px', color: 'gray' }}>
            <strong>{user.posts?.length} Posts, </strong>
          </span>
          
          <span style={{ fontSize: '15px', color: 'gray' }}>
            <strong>{user.followers?.length}</strong> Followers
          </span>
        </div>
      </div>

      {/* <Feed /> */}
    </div>
  )
}
