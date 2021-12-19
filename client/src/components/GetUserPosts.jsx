import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  ButtonGroup
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { DeleteOutline } from '@material-ui/icons'

import UserContext from '../context/UserContext'

export default function GetUserPosts () {
  const { user } = useContext(UserContext)
  const userId = user._id
  const [posts, setPosts] = useState([])
  const avatar = user.profilePicture

  const getPosts = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/posts/${userId}/posts`)
        .then(response => setPosts(response.data))
    } catch (error) {
      throw new Error(error)
    }
  }

  // http://localhost:8000/api/posts/:userId/posts/:postId
  const deletePost = async postId => {
    try {
      await axios.delete(
        `http://localhost:8000/api/posts/${userId}/posts/${postId}`
      )
      getPosts()
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [user])

  return (
    <div>
      <button onClick={() => console.log(posts)}>log posts</button>
      <h2>my posts: </h2>
      {posts.map(post => (
        <Card key={post._id} style={{ padding: 2, marginTop: 2 }}>
          <CardHeader
            key={post._id}
            avatar={<Avatar alt='' src={avatar} />}
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
      ))}
    </div>
  )
}
