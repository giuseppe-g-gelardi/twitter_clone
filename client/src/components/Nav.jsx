import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import UserContext from '../context/UserContext'
import '../Header.css'

export default function Nav() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <a>Hey</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link to='/home'>
              <a>Home</a>
            </Link>
          </li>

          <li>
            <Link to='/login'>
              <a>Login</a>
            </Link>
          </li>

          <li>
            <Link to='/register'>
              <a>Register</a>
            </Link>
          </li>

          <li>
            <Link to='/settings'>
              <a>Settings</a>
            </Link>
          </li>

          <li>
            <Link to='/' onClick={() => localStorage.removeItem('token')}>
              <a>Logout</a>
            </Link>
          </li>
        </ul>
      </nav>
      
    </header>
  )
}
