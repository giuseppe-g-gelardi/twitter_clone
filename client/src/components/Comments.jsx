import { useEffect, useState } from 'react'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import CreateReply from './CreateReply'
import { fetchReplies } from '../api/replies'

export default function Comments (props) {
  const { user, post, setDisplaySinglePost, likeUnlike, setDisplayPost } = props
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

  const getReplies = () => {
      fetchReplies(user._id, post._id)
        .then((res) => setReplies(res.data))
        .catch((err) => console.log(err))
      console.log(replies)
  }

  // ! needed?
  // const mapReplies = () => {
  //   replies.map(reply => console.log(reply.user[0]))
  // }

  useEffect(() => {
    getReplies()
  }, [user])

  return (
    <div>
      {setDisplayPost ? (
        <>
          <Card
            key={post._id}
            style={{ padding: 2, marginTop: 2, width: '100%' }}
          >
            <CardHeader
              key={post._id}
              avatar={
                <Avatar
                  alt='/images/profilePicture'
                  src={user.profilePicture}
                />
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
                  onClick={() => `${setDisplaySinglePost(false)}`}
                >
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
            <CreateReply
              userProfile={user}
              post={post}
              replies={replies}
              setReplies={setReplies}
            />
          </Container>
          {replies.length > 0
            ? replies.map(reply => (
                <ul key={reply._id}>
                  <li>
                    {reply.user[0]} says: {reply.text}
                  </li>
                </ul>
              ))
            : null}
        </>
      ) : (
        <>
          <Card
            key={post._id}
            style={{ padding: 2, marginTop: 2, width: '100%' }}
          >
            <CardHeader
              key={post._id}
              avatar={
                <Avatar
                  alt='/images/profilePicture'
                  src={user.profilePicture}
                />
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
        </>
      )}
    </div>
  )
}

// const getReplies = async () => {
//   try {
//     axios
//       .get(
//         `http://localhost:8000/api/posts/${user._id}/posts/${post._id}/replies`
//       )
//       .then(response => setReplies(response.data))
//     console.log(replies)
//   } catch (err) {
//     console.log(err)
//   }
// }
