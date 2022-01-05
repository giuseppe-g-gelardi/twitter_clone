import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
// import SidebarOption from "./SidebarOption";
import '../SidebarOption.css'
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import {Button} from "@material-ui/core"

export const SidebarOption = ({ active, text, Icon }) => {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
        <Icon />
        <h2>{text}</h2>
    </div>
)
}


function Sidebar() {
    return (
        <div style={{ borderRight: '1px solid var(--blue)', flex: '0.3', marginTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
            <TwitterIcon style={{ color: 'blueviolet', fontSize: '30px !important', marginLeft: '20px', marginBottom: '20px'  }} />

            <SidebarOption active Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Explore" />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" />
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
            <SidebarOption Icon={ListAltIcon} text="Lists" />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" />
            <SidebarOption Icon={MoreHorizIcon} text="More" />

            {/* <Button variant="outlined" className="sidebar__tweet" fullWidth >Tweet</Button> */}



        </div>
    )
}

export default Sidebar
