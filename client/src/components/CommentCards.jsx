import { useContext } from 'react'

import {
  Card,
  // Typography,
  Avatar,
  CardHeader,
  IconButton,
  Typography
} from '@material-ui/core'
import FavoriteIcon from "@material-ui/icons/Favorite";

import UserContext from '../context/UserContext'
export default function CommentCards () {
  const { user } = useContext(UserContext)
  const avatar = user.profilePicture

  return (
    <>
      <Card>
        <CardHeader 
          avatar={
            <Avatar alt='' src={avatar} />
          }
          action={
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          }
          title={
            <Typography>
              {user.username}
            </Typography>
          }
          subheader='example post'
        />
      </Card>
    </>
  )
}
