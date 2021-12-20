import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  ButtonGroup,
  CardActionArea
} from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import CommentIcon from '@mui/icons-material/Comment'

export default function CommentCard (props) {
  const { user, post, deletePost } = props
  return (
    <Card key={post._id} style={{ padding: 2, marginTop: 2 }}>
      <CardActionArea
        onClick={() => `${console.log(`this should open post: ${post._id}`)}${post.replies.length > 0 ? console.log(post.replies) : console.log('no replies')}`}
      >
        <CardHeader
          key={post._id}
          avatar={
            <Avatar alt='/images/profilePicture' src={user.profilePicture} />
          }
          action={
            <ButtonGroup>
              <IconButton>
                <FavoriteIcon fontSize='small' />
              </IconButton>

              <IconButton onClick={() => deletePost(post._id)}>
                <DeleteIcon style={{ color: '#f07178' }} fontSize='small' />
              </IconButton>

              <IconButton>
                <CommentIcon fontSize='small' />
              </IconButton>
            </ButtonGroup>
          }
          title={user.username}
          subheader={post.description}
        />
      </CardActionArea>
    </Card>
  )
}
