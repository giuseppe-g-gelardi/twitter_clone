import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActionArea,
  CardContent,
  Container
} from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ReplyCard from './ReplyCard'

export default function CommentCard (props) {
  const { user, post, setDisplaySinglePost, likeUnlike } = props
  const [replies, setReplies] = useState([])

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
        .then(response => setReplies(response.data))
      console.log(replies)
    } catch (err) {
      console.log(err)
    }
  }

  const mapReplies = () => {
    replies.map(reply => console.log(reply.user[0]))
  }

  useEffect(() => post, [post.likes])

  return (
    <>
      <button onClick={() => getReplies()}>getReplies()</button>
      <button onClick={() => mapReplies()}>mapReplies()</button>
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
            <CardActionArea onClick={() => `${setDisplaySinglePost(false)}`}>
              <ExpandLessIcon />
            </CardActionArea>
          </IconButton>
          <IconButton
            onClick={() => post.replies.map(reply => console.log(reply))}
          >
            <CommentIcon fontSize='small' />
            {post.replies.length ? post.replies.length : null}
          </IconButton>
        </CardContent>
      </Card>
    </>
  )
}
