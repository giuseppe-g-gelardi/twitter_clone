import { Avatar, IconButton } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import moment from 'moment'

export default function UserPost (props) {
  const { user, post, setDisplaySinglePost, setDisplayPost, likeUnlike } = props
  const timestamp = post.createdAt
  const posttime = moment(timestamp).fromNow()

  const likeIcons = (
    <IconButton onClick={() => likeUnlike(post._id)}>
      {post.likes.length ? (
        <FavoriteIcon fontSize='small' color='primary' />
      ) : (
        <FavoriteBorderIcon fontSize='small' color='primary' />
      )}

      {post.likes.length ? post.likes.length : '0'}
    </IconButton>
  )

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
        <Avatar src={user?.profilePicture} />
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
          <IconButton
            onClick={() =>
              `${setDisplaySinglePost(true)} ${setDisplayPost(post)}`
            }
          >
            <ChatBubbleOutlineIcon fontSize='small' color='primary' />
            {post.replies.length ? post.replies.length : '0'}
          </IconButton>
          <IconButton>
            <RepeatIcon fontSize='small' />
          </IconButton>
          {likeIcons}

        </div>
      </div>
    </div>
  )
}
