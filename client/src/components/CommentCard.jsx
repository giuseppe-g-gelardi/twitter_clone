import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActionArea,
  CardContent
} from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function CommentCard (props) {
  const { user, post, setDisplaySinglePost, setDisplayPost, likeUnlike } = props

  const likeIcons = (
    <IconButton onClick={() => likeUnlike(post._id)}>
      {post.likes.length 
      ? (<FavoriteIcon fontSize='small' color='primary' />) 
      : (<FavoriteBorderIcon fontSize='small' color='primary' />
      )}

      {post.likes.length ? post.likes.length : null}
    </IconButton>
  )

  return (
    <Card key={post._id} style={{ padding: 2, marginTop: 2, width: '100%' }}>
      <CardHeader
        key={post._id}
        avatar={
          <Avatar alt='/images/profilePicture' src={user.profilePicture} />
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.username}
        subheader={post.description}
      />
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '20%',
          marginRight: '20%',
          marginBottom: '-25px',
          marginTop: '-25px'
        }}
      >
        {likeIcons}
        <IconButton>
          <CardActionArea
            onClick={() =>
              `${setDisplaySinglePost(true)} ${setDisplayPost(post)}`
            }
          >
            <ExpandMoreIcon />
          </CardActionArea>
        </IconButton>
        <IconButton>
          <CommentIcon fontSize='small' />
          {post.replies.length ? post.replies.length : null}
        </IconButton>
      </CardContent>
    </Card>
  )
}
