// import { useContext } from 'react'
import { Link } from 'react-router-dom'

// import UserContext from '../context/UserContext'
import '../Header.css'

export default function Nav() {
  // const { user } = useContext(UserContext)

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          Hey
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link to='/'>
              Home
            </Link>
          </li>

          <li>
            <Link to='/login'>
              Login
            </Link>
          </li>

          <li>
            <Link to='/register'>
              Register
            </Link>
          </li>

          <li>
            <Link to='/settings'>
              Settings
            </Link>
          </li>

          <li>
            <Link to='/' onClick={() => `${localStorage.removeItem('token')}${window.location.reload()}`}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      
    </header>
  )
}
