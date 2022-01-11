import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, IconButton } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import moment from 'moment'

import CreateReply from './CreateReply'
import Reply from './Reply'
import { fetchReplies } from '../api/replies.ts'
import { getUser } from '../api/users.ts'

export default function FollowingFeedSinglePost(props) {
  const { post, setDisplaySinglePost, likeUnlike, likes, user } = props
  const [replies, setReplies] = useState([])
  // const timestamp = post.createdAt
  // const posttime = moment(timestamp).fromNow()
  const { id } = useParams()
  // const [user, setUser] = useState([])
  const [displayUser, setDisplayUser] = useState([])


useEffect(() => {
  let isCancelled = false
  getUser(id).then(res => {
    if (!isCancelled) {
      setDisplayUser(res.data)
    }
  }).catch(err => console.log(err, ' trouble fetching user in usersinglepost'))
  return () => {
    isCancelled = true
  }
}, [])

useEffect(() => {
  let isCancelled = false
  fetchReplies(user.id, post.id).then(res => {
    if (!isCancelled) {
      setReplies(res.data, ...replies)
    }
  }).catch(err => console.log(err, ' trouble fetching replies in usersinglepost'))
  return () => {
    isCancelled = true
  }
}, [])

  // TODO: figure out why likes dont happen in real time in single post view

  const likeIcons = (
    <IconButton onClick={() => likeUnlike(post._id)}>
      {post.likes?.length ? (
        <FavoriteIcon fontSize='small' color='primary' />
      ) : (
        <FavoriteBorderIcon fontSize='small' color='primary' />
      )}

      {post.likes?.length ? post.likes?.length : '0'}
    </IconButton>
  )

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          borderBottom: '1px solid grey',
          paddingBottom: '10px'
        }}
      >
        <div style={{ padding: '20px' }}>
          <Avatar src={displayUser?.profilePicture} />
        </div>
        <div style={{ flex: '1', padding: '10px' }}>
          <div className='post__header'>
            <div style={{ fontSize: '15px', marginBottom: '5px' }}>
              <h3 style={{ fontSize: '15px', marginBottom: '5px' }}>
                {displayUser.username}{' '}
                <span
                  style={{ fontWeight: '600', fontSize: '12px', color: 'gray' }}
                >
                  {user.verified && (
                    <VerifiedUserIcon
                      className='post__badge'
                      style={{ fontSize: '14px', color: 'blueviolet' }}
                    />
                  )}{' '}
                  @{displayUser.username} {moment(post.createdAt).fromNow()}
                </span>
              </h3>
            </div>
            <div style={{ marginBottom: '10px', fontSize: '15px' }}>
              <p>{post.description}</p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px'
            }}
          >
            <IconButton onClick={() => `${setDisplaySinglePost(false)}`}>
              <ChatBubbleOutlineIcon fontSize='small' color='primary' />
              {post.replies?.length ? post.replies?.length : '0'}
            </IconButton>
            <IconButton>
              <RepeatIcon fontSize='small' />
            </IconButton>
            {likeIcons}

          </div>
        </div>
      </div>
      <div>
        <CreateReply
          userProfile={user}
          post={post}
          replies={replies}
          setReplies={setReplies}
        />
      </div>

      {replies.length > 0
        ? replies
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(reply => (
              <Reply
                key={reply._id}
                user={reply.user[0]}
                text={reply.text}
                userPage={user}
              />
            ))
        : null}
    </>
  )
}

