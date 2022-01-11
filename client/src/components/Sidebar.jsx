import React, { useContext } from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
// import SidebarOption from "./SidebarOption";
import '../SidebarOption.css'
import HomeIcon from '@material-ui/icons/Home'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'

export const SidebarOption = ({ active, text, Icon }) => {
  return (
    <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  )
}

export default function Sidebar () {
  const { user } = useContext(UserContext)

  const useAuth = () => {
    return localStorage.getItem('token') ? true : false
  }
  const auth = useAuth()

  const authMenu = (
    <div style={{ marginLeft: 'auto'}}>
      <Link to='/home'>
        <SidebarOption active Icon={HomeIcon} text='Home' />
      </Link>
      <Link to='/search'>
        <SidebarOption Icon={HomeIcon} text='Search' />
      </Link>
      <Link to='/feed'>
        <SidebarOption Icon={HomeIcon} text='Feed' />
      </Link>
      <Link to='/fray'>
        <SidebarOption Icon={HomeIcon} text='The Fray' />
      </Link>
      <Link to='/following'>
        <SidebarOption Icon={HomeIcon} text='Following' />
      </Link>
      <Link to='/settings'>
        <SidebarOption Icon={HomeIcon} text='Settings' />
      </Link>
      <Link
        to='/login'
        onClick={() =>
          `${localStorage.removeItem('token')}${window.location.reload()}`
        }
      >
        <SidebarOption Icon={HomeIcon} text='Logout' />
      </Link>
    </div>
  )

  const noAuthMenu = (
    <>
      <Link to='/login'>
        <SidebarOption Icon={HomeIcon} text='Login' />
      </Link>
      <Link to='/register'>
        <SidebarOption Icon={HomeIcon} text='Register' />
      </Link>
    </>
  )

  return (
    <div
      style={{
        borderRight: '1px solid var(--blue)',
        flex: '0.3',
        marginTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}
    >
      <TwitterIcon
        style={{
          color: 'blueviolet',
          fontSize: '30px !important',
          marginLeft: '20px',
          marginBottom: '20px'
        }}
      />

      {auth ? authMenu : noAuthMenu}
    </div>
  )
}
