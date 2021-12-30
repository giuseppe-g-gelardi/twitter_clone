import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActionArea,
  CardContent,
  Typography,
  Container
} from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import moment from 'moment'

export default function SinglePost () {
  const [post, setPost] = useState()
  const [likes, setLikes] = useState([])
  const { id } = useParams()
  const { postid } = useParams()
  const [user, setUser] = useState([])
  const api = `http://localhost:8000/api/posts/${id}/posts/${postid}`
  // user._id: 61baaced780cf3e51957becb
  // post._id: 61bf9421edeffdd6a70738a6

  const timestamp = post.createdAt
  const posttime = moment(timestamp).fromNow()

  useEffect(() => getPost(), [])
  useEffect(() => getUser(), [])

  const getPost = async () => {
    try {
      await axios.get(api).then(response => setPost(response.data))
    } catch (error) {
      throw new Error(error, 'Something went wrong, I think... lol')
    }
  }

  const getUser = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/users/${id}`)
        .then(
          response => `${setUser(response.data)}${console.log(response.data)}`
        )
    } catch (error) {
      throw new Error(error, 'Something went wrong, I think... lol')
    }
  }

  const likeUnlike = async () => {
    let newLike = {
      userId: user._id
    }
    try {
      await axios
        .put(`${api}/likes`, newLike)
        .then(response => setLikes([...likes, newLike, response.data]))
    } catch (error) {
      throw new Error(error)
    }
  }

  const likeIcons = (
    <IconButton onClick={() => likeUnlike(post._id)}>
      {post.likes?.length ? (
        <FavoriteIcon fontSize='small' color='primary' />
      ) : (
        <FavoriteBorderIcon fontSize='small' color='primary' />
      )}

      {post.likes?.length ? post.likes?.length : null}
    </IconButton>
  )

  return (
    <div>
      <h1>single post view!</h1>
      {/* <h2>{post[0].description}</h2> */}
      <button onClick={() => console.log(post[0].description)}>
        post text
      </button>
      <button onClick={() => console.log(post[0])}>post object</button>
      <button onClick={() => console.log(post[0].likes)}>post likes?</button>
      <button onClick={() => console.log(user)}>user object</button>

      <Container>
        <Card style={{ padding: 2, marginTop: 2, width: '100%' }}>
          <CardHeader
            avatar={
              <Avatar alt='/images/profilePicture' src={user.profilePicture} />
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
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
            <Typography>
              {user.username} <br />
              {post.description} <br />
              {posttime}
            </Typography>
            <button onClick={() => console.log(user._id, post._id)}>
              log post
            </button>
            {likeIcons}
            <IconButton>
              <CardActionArea onClick={() => console.log(post._id)}>
                <ExpandMoreIcon />
              </CardActionArea>
            </IconButton>
            <IconButton>
              <CommentIcon fontSize='small' />
              replies here
            </IconButton>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
