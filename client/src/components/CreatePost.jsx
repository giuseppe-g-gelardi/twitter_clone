import { useContext, useState } from 'react'
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

export default function CreatePost () {
  const { user } = useContext(UserContext)
  const userId = user._id
  const [description, setDescription] = useState([])
  const api = `http://localhost:8000/api/posts/${userId}`

  const refreshPage = () => {
    window.location.reload()
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const newPost = {
      description: description
    }
    try {
      await axios
        .post(api, newPost)
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

  return (
    <Container>
      <Card>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              style={{ marginBottom: 20 }}
              onChange={e => setDescription(e.target.value)}
              label='Create a new post'
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
            >
              Add new Post
            </Button>
          </FormControl>
        </form>
      </Card>
    </Container>
  )
}
