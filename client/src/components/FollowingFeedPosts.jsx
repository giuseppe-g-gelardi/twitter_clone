import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, IconButton } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import moment from 'moment'
import { likes as likePost } from '../api/posts.ts'

export default function FollowingFeedPosts(props) {
  const { post, setDisplaySinglePost, setDisplayPost, user, loggedInUser } = props
  const timestamp = post.createdAt
  const posttime = moment(timestamp).fromNow()
  const [likes, setLikes] = useState([])
  
  const likeUnlike = postid => {
    let newLike = { userid: loggedInUser._id }
    likePost(user.id, postid, newLike).then(setLikes([...likes, newLike])).catch(err => console.log(err, 'error liking or unliking post in user profile component'))
  }

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
              <Link to={`/users/${user.id}`}>
              {user.username}{' '}
              </Link>
              <span
                style={{ fontWeight: '600', fontSize: '12px', color: 'gray' }}
              >
                {user.verified && (
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
  // const { id } = useParams()
  // const [displayUser, setDisplayUser] = useState([])
  // useEffect(() => {
  //   let isCancelled = false
  //   getUser(user.id).then(res => {
  //     if (!isCancelled) {
  //       setDisplayUser(res.data)
  //     }
  //   }).catch(err => console.log(err))
  //   return () => {
  //     isCancelled = true
  //   }
  // }, [user.id])
