import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { FaUser } from 'react-icons/fa'


import '../AuthForms.css'

export default function RegisterForm () {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('')
  const api = `http://localhost:8000/api/users/register`

  // const refreshPage = () => {
  //   window.location.reload()
  // }

  const handleSubmit = async e => {
    e.preventDefault()

    if (userPassword !== userPasswordConfirm) {
      toast.error('Passwords do not match!')
      return
    }

    const user = {
      username: username,
      email: userEmail,
      password: userPassword
    }
    await axios
      .post(api, user)
      .then(response => {
        localStorage.setItem('token', response.headers['x-auth-token'])
        // navigate('/home')
        // refreshPage()
      })
      .catch(error => {
        console.log(`Axios error: `, error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='auth'>
        <h1>
          <FaUser /> {' '} Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input 
              type='text'
              id='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div>
          <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input
              type='password'
              id='passwordConfirm'
              value={userPasswordConfirm}
              onChange={(e) => setUserPasswordConfirm(e.target.value)}
            />
          </div>

          <input type='submit' value='Register' className='btn' />
        </form>

        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>

      </div>
    </form>
  )
}

// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate, Link } from 'react-router-dom'
// // import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { FormControl, Container, Button, TextField } from '@material-ui/core'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
// import { makeStyles } from '@material-ui/core/styles'

// import '../AuthForms.css'

// const useStyles = makeStyles({
//   field: {
//     marginTop: 10,
//     marginBottom: 10,
//     display: 'block'
//   },
//   text: {
//     marginTop: 10,
//     marginBottom: 10,
//     display: 'block',
//     color: '#bd93f9'
//   }
// })

// export default function RegisterForm () {

//   const navigate = useNavigate()
//   const [username, setUsername] = useState('')
//   const [userEmail, setUserEmail] = useState('')
//   const [userPassword, setUserPassword] = useState('')
//   const classes = useStyles()
//   const api = `http://localhost:8000/api/users/register`

//   const refreshPage = () => {
//     window.location.reload()
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()

//     const user = {
//       username: username,
//       email: userEmail,
//       password: userPassword
//     }
//     await axios
//       .post(api, user)
//       .then(response => {
//         localStorage.setItem('token', response.headers['x-auth-token'])
//         navigate('/home')
//         refreshPage()
//       })
//       .catch(error => {
//         console.log(`Axios error: `, error)
//       })
//   }

//   return (
//     <Container>
//       <form onSubmit={handleSubmit}>
//         <FormControl>

//           <TextField
//             style={{ marginBottom: 20 }}
//             onChange={e => setUsername(e.target.value)}
//             className={classes.field}
//             label='Enter a username'
//             variant='outlined'
//             fullWidth
//             required
//           />

//           <TextField
//             style={{ marginBottom: 20 }}
//             onChange={e => setUserEmail(e.target.value)}
//             className={classes.field}
//             label='Enter your email'
//             variant='outlined'
//             fullWidth
//             required
//           />

//           <TextField
//             style={{ marginBottom: 20 }}
//             onChange={e => setUserPassword(e.target.value)}
//             className={classes.field}
//             label='Enter a password'
//             variant='outlined'
//             type='password'
//             fullWidth
//             required
//           />

//           <Button
//             type='submit'
//             color='primary'
//             variant='contained'
//             endIcon={<KeyboardArrowRightIcon />}
//           >
//             Register Account!
//           </Button>
//         </FormControl>
//       </form>
//     </Container>
//   )
// }
