import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Card,
  Container,
  FormControl,
  TextField
} from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import UserContext from '../context/UserContext'

export default function CreateReply (props) {
  const { post } = props
  const { user } = useContext(UserContext)
  const userId = user._id
  const [text, setText] = useState('')

  const api = `http://localhost:8000/api/posts/${userId}/posts/${post._id}/replies`

  const refreshPage = () => {
    window.location.reload()
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const newReply = {
      text: text,
      user: user._id
    }
    try {
      await axios
        .post(api, newReply)
        .then(response => {
          console.log(response)
          refreshPage()
        })
        .catch(error => {
          console.log(`Axios error: `, error)
        })
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => console.log('refresh'), [])

  return (
    <Container>
      <Card>
        <button onClick={() => console.log(post)}>log post</button>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              style={{ marginBottom: 20 }}
              onChange={e => setText(e.target.value)}
              label='reply to ....'
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
    </Container>
  )
}
