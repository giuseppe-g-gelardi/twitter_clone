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
import CreateReply from './CreateReply'

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
  // get single user endpoint
  // http://localhost:8000/api/users/61baaa75780cf3e51957bea1

  const getUser = async (userId) => {
    try {
      axios
        .get(`http://localhost:8000/api/users/${userId}`)
    } catch (error) {
      throw new Error(error)
    }
  }

  const mapReplies = () => {
    replies.map(reply => console.log(reply.user[0]))
  }

  useEffect(() => {
    getReplies()
  }, [user])

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
      <Container>
        <CreateReply post={post} replies={replies} setReplies={setReplies} />
      </Container>
        {replies.length > 0 ? (
        replies.map(reply => (
          <ul key={reply._id}>
            <li>{reply.user[0]} says: {reply.text}</li>
          </ul>
        ))
        
        ) : null}
    </>
  )
}
