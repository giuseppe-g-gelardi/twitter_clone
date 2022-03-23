import { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { feed } from '../api/users.ts'
import FollowingFeedPosts from './FollowingFeedPosts'

export default function FollowingFeed () {
  const { user } = useContext(UserContext)
  const [postsWithUserInfo, setPostsWithUserInfo] = useState([])

  useEffect(() => {
    if (!user._id) return
    feed(user._id)
      .then(res => setPostsWithUserInfo(res.data))
      .catch(err => err, ' error getting feed')
  }, [user, postsWithUserInfo])

  return (
    <div>
      <div>
        <span
          style={{ display: 'flex', marginTop: '15px', marginBottom: '15px' }}
        >
          <strong>Hey, {user.username}!</strong>
          <p>sup?</p>
        </span>
        <p style={{ display: 'flex' }}>
          Check out what your friends are saying!
        </p>
      </div>
      {postsWithUserInfo
        .sort((a, b) => new Date(b.post.createdAt) - new Date(a.post.createdAt))
        .map(comboObject => (
          <FollowingFeedPosts
            key={comboObject.post._id}
            post={comboObject.post}
            user={comboObject.user}
            loggedInUser={user}
          />
        ))}
    </div>
  )
}

