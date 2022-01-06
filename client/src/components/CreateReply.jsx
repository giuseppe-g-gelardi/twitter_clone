import { useContext, useState } from 'react'
import axios from 'axios'
import { Avatar, Button, Card, FormControl, TextField } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import UserContext from '../context/UserContext'
// TODO fix reply form so its all centered horizontally

export default function CreateReply (props) {
  const { post, replies, setReplies, userProfile } = props
  const { user } = useContext(UserContext)
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

  return (
    <div
      style={{
        paddingBottom: '10px',
        borderBottom: '8px solid blueviolet',
        paddingRight: '10px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ padding: '20px', display: 'flex' }}>
          <Avatar src={user.profilePicture} />

          <input
            onChange={e => setText(e.target.value)}
            placeholder=' Send your reply'
            type='text'
            style={{
              flex: '1',
              // marginLeft: '20px',
              margin: '5px',
              fontSize: '20px',
              border: 'none',
              borderRadius: '15px'
            }}
          />
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
            // marginTop: '20px',
            marginLeft: 'auto'
          }}
        >
          Reply
        </Button>
        </div>
      </form>
    </div>
  )
}
