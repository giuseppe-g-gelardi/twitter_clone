import React from 'react'

import {
  Card,
  ButtonGroup,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
  Avatar
} from '@material-ui/core'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ReplyIcon from '@mui/icons-material/Reply'

export default function PostContainer (props) {
  const { firstName, post } = props

  return (
    <Container>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <AccountBoxIcon />
            </Avatar>
          }
          action={
            <ButtonGroup variant='contained'>
              <IconButton>
                <ThumbUpIcon />
              </IconButton>
              <IconButton>
                <ThumbDownIcon />
              </IconButton>
            </ButtonGroup>
          }
          title={`${firstName} says:`}
        />

        <CardContent>
          <Card style={{ display: 'flex' }}>
            <Typography style={{ flexGrow: 1 }}>{post}</Typography>
            <IconButton>
              <ReplyIcon />
            </IconButton>
          </Card>
        </CardContent>
      </Card>
    </Container>
  )
}
