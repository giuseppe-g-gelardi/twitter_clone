import { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, IconButton } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import PublishIcon from '@material-ui/icons/Publish'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import moment from 'moment'
import CreateReply from './CreateReply'
import Reply from './Reply'
import { fetchReplies } from '../api/replies.ts'

export default function SinglePost (props) {
  const { user, post, setDisplaySinglePost, likeUnlike } = props
  const [replies, setReplies] = useState([])
  const timestamp = post.createdAt
  const posttime = moment(timestamp).fromNow()

  // TODO: figure out why likes dont happen in real time in single post view
  // TODO: figure out why likes dont happen in real time in single post view
  // TODO: figure out why likes dont happen in real time in single post view
  // TODO: figure out why likes dont happen in real time in single post view
  // TODO: figure out why likes dont happen in real time in single post view

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
      const res = await fetchReplies(user._id, post._id)
      setReplies(res, ...replies)
    } catch (error) {
      throw new Error(error)
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
              {post.replies.length ? post.replies.length : null}
            </IconButton>
            <IconButton>
              <RepeatIcon fontSize='small' />
            </IconButton>
            {likeIcons}
            <IconButton>
              <PublishIcon fontSize='small' />
            </IconButton>
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

// {/* //! replies */}
// {replies.length > 0
//   ? replies
//   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//   .map(reply => (
//       <ul key={reply._id}>
//         <li>
//           {reply.user[0]} says: {reply.text}
//         </li>
//       </ul>
//     ))
//   : null}

// const getReplies = async () => {
//   try {
//     axios
//       .get(
//         `http://localhost:8000/api/posts/${user._id}/posts/${post._id}/replies`
//       )
//       .then(response => setReplies(response.data, ...replies))
//   } catch (error) {
//     throw new Error(error)
//   }
// }
