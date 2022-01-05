import { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, Button, IconButton } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import PublishIcon from '@material-ui/icons/Publish'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import moment from 'moment'
import CreateReply from './CreateReply'

export default function SinglePost (props) {
  const { user, post, setDisplaySinglePost, likeUnlike } = props
  const [replies, setReplies] = useState([])
  const timestamp = post.createdAt
  const posttime = moment(timestamp).fromNow()

  const likeIcons = (
    <IconButton onClick={() => likeUnlike(post._id)}>
      {post.likes.length ? (
        <FavoriteIcon fontSize='small' color='primary' />
      ) : (
        <FavoriteBorderIcon fontSize='small' color='primary' />
      )}

      {post.likes.length ? post.likes.length : null}
    </IconButton>
  )

  const getReplies = async () => {
    try {
      axios
        .get(
          `http://localhost:8000/api/posts/${user._id}/posts/${post._id}/replies`
        )
        .then(response => setReplies(response.data, ...replies))
      console.log(replies)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReplies()
  }, [])

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
          <Avatar src={user.profilePicture} />
        </div>
        <div style={{ flex: '1', padding: '10px' }}>
          <div className='post__header'>
            <div style={{ fontSize: '15px', marginBottom: '5px' }}>
              <h3>
                {user.username}{' '}
                <span
                  style={{ fontWeight: '600', fontSize: '12px', color: 'gray' }}
                >
                  {user.isVerified && (
                    <VerifiedUserIcon
                      className='post__badge'
                      style={{ fontSize: '14px', color: 'blueviolet' }}
                    />
                  )}
                  @{user.username} {posttime}
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
              <ChatBubbleOutlineIcon fontSize='small' />
            </IconButton>
            <RepeatIcon fontSize='small' />
            {likeIcons}
            <PublishIcon fontSize='small' />
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
        ? replies.map(reply => (
            <ul key={reply._id}>
              <li>
                {reply.user[0]} says: {reply.text}
              </li>
            </ul>
          ))
        : null}
    </>
  )
}
