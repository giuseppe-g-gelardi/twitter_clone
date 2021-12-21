import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActionArea,
  CardContent
} from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
// import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function CommentCard (props) {
  const { user, post, setDisplaySinglePost, setDisplayPost } = props
  // TODO add conditional deletePost()

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
        <IconButton>
          <FavoriteIcon fontSize='small' color='primary' />
          {post.likes.length ? post.likes.length : ''}
        </IconButton>
        <IconButton>
          <CardActionArea onClick={() => `${setDisplaySinglePost(true)} ${setDisplayPost(post)}`} >
            <ExpandMoreIcon />
          </CardActionArea>
        </IconButton>
        <IconButton>
          <CommentIcon fontSize='small' />
          {post.replies.length ? post.replies.length : ''}
        </IconButton>
      </CardContent>
    </Card>
  )
}

