import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'

import '../AuthForms.css'

export default function LoginForm() {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
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
        navigate('/home')
        refreshPage()
      })
      .catch(error => {
        console.log(`Axios error: `, error)
      })
  }

  return (
    <div className='auth'>
      <h1>
        <FaUser /> {' '} Log In
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email Address</label>
          <input 
            type='email'
            id='email'
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
            type='password'
            id='password'
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
          />
        </div>

        <input type='submit' value='Login' className='btn' />
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  )
}




// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
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

// export default function LoginForm (props) {

//   const [userEmail, setUserEmail] = useState('')
//   const [userPassword, setUserPassword] = useState('')
//   const classes = useStyles()
//   const navigate = useNavigate()

//   const api = `http://localhost:8000/api/auth/login`

//   const refreshPage = () => {
//     window.location.reload()
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()

//     const user = {
//       email: userEmail,
//       password: userPassword
//     }
//     axios
//       .post(api, user)
//       .then(response => {
//         localStorage.setItem('token', response.data)
//         navigate('/home')
//         refreshPage()
//       })
//       .catch(error => {
//         console.log(`Axios error: `, error)
//       })
//   }

//   return (
//     <div className='auth'>
  
//       <form onSubmit={handleSubmit}>
//         <FormControl>

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

//           <button
//             className='btn'
//             type='submit'
//             color='primary'
//             variant='contained'
//             endIcon={<KeyboardArrowRightIcon />}
//           >
//             Login
//           </button>
//         </FormControl>
//       </form>
//     </div>
//   )
// }
