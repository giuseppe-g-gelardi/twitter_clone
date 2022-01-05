import { useContext, useState } from 'react'
import axios from 'axios'
import { Avatar, Button } from '@material-ui/core'
import UserContext from '../context/UserContext'

export default function CreatePost () {
  const { user } = useContext(UserContext)
  const userId = user._id
  const [description, setDescription] = useState([])
  const api = `http://localhost:8000/api/posts/${userId}`

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
        })
        .catch(error => {
          console.log(`Axios error: `, error)
        })
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
      <div
        style={{
          paddingBottom: '10px',
          borderBottom: '8px solid blueviolet',
          paddingRight: '10px',
          border: '2px solid grey',
          borderRadius: '30px'
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', display: 'flex' }}>
            <Avatar src={user.profilePicture} />

            <input
              onChange={e => setDescription(e.target.value)}
              placeholder="What's happening?"
              type='text'
              style={{
                flex: '1',
                marginLeft: '20px',
                fontSize: '20px',
                border: 'none'
              }}
            />
          </div>

          <Button
            type='submit'
            style={{
              backgroundColor: 'blueviolet',
              border: 'none',
              color: 'white',
              fontWeight: '900',
              textTransform: 'inherit',
              borderRadius: '30px',
              width: '80px',
              height: '40px',
              marginTop: '20px',
              marginLeft: 'auto'
            }}
          >
            Tweet
          </Button>
        </form>
      </div>
  )
}
