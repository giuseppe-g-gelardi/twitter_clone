import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  ButtonGroup
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { DeleteOutline } from '@material-ui/icons'

export default function CommentCard (props) {
  const { user, post, deletePost } = props
  return (
    <Card key={post._id} style={{ padding: 2, marginTop: 2 }}>
      <CardHeader
        key={post._id}
        avatar={<Avatar alt='' src={user.profilePicture} />}
        action={
          <ButtonGroup>
            <IconButton>
              <FavoriteIcon />
            </IconButton>

            <IconButton onClick={() => deletePost(post._id)}>
              <DeleteOutline style={{ color: '#f07178' }} />
            </IconButton>
          </ButtonGroup>
        }
        title={user.username}
        subheader={post.description}
      />
    </Card>
  )
}
