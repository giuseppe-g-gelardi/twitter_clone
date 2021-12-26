import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Card,
  FormControl,
  TextField
} from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import UserContext from '../context/UserContext'

export default function CreateReply (props) {
  const { post, replies, setReplies, userProfile } = props
  const { user } = useContext(UserContext)
  const userId = user._id
  const [text, setText] = useState('')

  const api = `http://localhost:8000/api/posts/${userProfile._id}/posts/${post._id}/replies`

  const handleSubmit = async e => {
    e.preventDefault()

    const newReply = {
      text: text,
      user: user._id
    }
    try {
      await axios.post(api, newReply)
      setReplies([...replies, newReply])
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => console.log('refresh'), [])

  return (
    <>
      <Card
        style={{
          display: 'block',
          padding: 2,
          marginTop: 2
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth={true}>
            <TextField
              style={{ marginBottom: 20 }}
              onChange={e => setText(e.target.value)}
              label={`Reply to ${userProfile.username}`}
              variant='outlined'
              type='text'
              disableElevation={true}
              fullWidth={true}
              required={true}
            />
            <Button
              type='submit'
              color='primary'
              variant='contained'
              endIcon={<KeyboardArrowRightIcon />}
              fullWidth={true}
            >
              Add new Post
            </Button>
          </FormControl>
        </form>
      </Card>
    </>
  )
}

// {/* <button onClick={() => console.log(post)}>log post</button> */}
