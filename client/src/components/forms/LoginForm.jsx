import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FormControl, Container, Button, TextField } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block',
    color: '#bd93f9'
  }
})

export default function LoginForm (props) {

  const { setOpenPopup } = props
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const classes = useStyles()
  const navigate = useNavigate()

  const api = `http://localhost:8000/api/auth/login`

  const refreshPage = () => {
    window.location.reload()
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const user = {
      email: userEmail,
      password: userPassword
    }
    axios
      .post(api, user)
      .then(response => {
        localStorage.setItem('token', response.data)
        setOpenPopup(false)
        navigate('/home')
        refreshPage()
      })
      .catch(error => {
        console.log(`Axios error: `, error)
      })
  }

  return (
    <Container>
  
      <form onSubmit={handleSubmit}>
        <FormControl>

          <TextField
            style={{ marginBottom: 20 }}
            onChange={e => setUserEmail(e.target.value)}
            className={classes.field}
            label='Enter your email'
            variant='outlined'
            fullWidth
            required
          />

          <TextField
            style={{ marginBottom: 20 }}
            onChange={e => setUserPassword(e.target.value)}
            className={classes.field}
            label='Enter a password'
            variant='outlined'
            type='password'
            fullWidth
            required
          />

          <Button
            type='submit'
            color='primary'
            variant='contained'
            endIcon={<KeyboardArrowRightIcon />}
          >
            Login
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}
