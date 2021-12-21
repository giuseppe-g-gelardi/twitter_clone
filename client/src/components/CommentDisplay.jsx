
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActionArea,
  CardContent
} from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite'
// import DeleteIcon from '@mui/icons-material/Delete'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


export default function CommentCard (props) {
  const { user, post, setDisplaySinglePost } = props
  // TODO add deletePost() to menu

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
    <CardActionArea onClick={() => `${setDisplaySinglePost(false)}`} >
      <ExpandLessIcon />
    </CardActionArea>
  </IconButton>
  <IconButton onClick={() => post.replies.map(reply => (console.log(reply)))} >
    <CommentIcon fontSize='small' />
    {post.replies.length ? post.replies.length : ''}
  </IconButton>
</CardContent>
</Card>
  )
}


