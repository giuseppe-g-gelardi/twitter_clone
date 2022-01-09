import React, { useContext } from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
// import SidebarOption from "./SidebarOption";
import '../SidebarOption.css'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import ListAltIcon from '@material-ui/icons/ListAlt'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
// import {Button} from "@material-ui/core"
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
    <>
      <Link to='/home'>
        <SidebarOption active Icon={HomeIcon} text='Home' />
      </Link>
      <Link to='/search'>
        <SidebarOption Icon={SearchIcon} text='Search' />
      </Link>
      <Link to='/notifications'>
        {/* might make into a dropdown or remove completely */}
        <SidebarOption Icon={NotificationsNoneIcon} text='Notifications' />
      </Link>
      <Link to='/following'>
        <SidebarOption Icon={ListAltIcon} text='Following' />
      </Link>
      <Link to='/settings'>
        <SidebarOption Icon={PermIdentityIcon} text='Settings' />
      </Link>
      <Link
        to='/login'
        onClick={() =>
          `${localStorage.removeItem('token')}${window.location.reload()}`
        }
      >
        <SidebarOption Icon={MoreHorizIcon} text='Logout' />
      </Link>
    </>
  )

  const noAuthMenu = (
    <>
      <Link to='/login'>
        <SidebarOption Icon={PermIdentityIcon} text='Login' />
      </Link>
      <Link to='/register'>
        <SidebarOption Icon={MoreHorizIcon} text='Register' />
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

{
  /* <SidebarOption active Icon={HomeIcon} text='Home' />
<SidebarOption Icon={SearchIcon} text='Search' />
<SidebarOption Icon={NotificationsNoneIcon} text='Notifications' />
<SidebarOption Icon={MailOutlineIcon} text='Messages' />
<SidebarOption Icon={BookmarkBorderIcon} text='Bookmarks' />
<SidebarOption Icon={ListAltIcon} text='Lists' />
<SidebarOption Icon={PermIdentityIcon} text='Profile' />
<SidebarOption Icon={MoreHorizIcon} text='More' /> */
}
