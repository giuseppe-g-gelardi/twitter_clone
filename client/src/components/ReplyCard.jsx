import {
  Card,
  CardHeader,
  Avatar,
  // IconButton,
  CardContent
} from '@material-ui/core'
// import FavoriteIcon from '@mui/icons-material/Favorite'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import CommentIcon from '@mui/icons-material/Comment'

export default function ReplyCard (props) {
  const { reply } = props

  return (
    <Card key={reply._id} style={{ padding: 2, marginTop: 2, width: '100%' }}>
      <CardHeader
        key={reply._id}
        avatar={<Avatar alt='/images/profilePicture' src={'U'} />}
        title={'title'}
        subheader={reply}
      />
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '20%',
          marginRight: '20%',
          marginBottom: '-25px',
          marginTop: '-25px'
        }}
      ></CardContent>
    </Card>
  )
}

// {/* {likeIcons} */}
// {/* <IconButton>
//   <CardActionArea onClick={() => `${setDisplaySinglePost(true)} ${setDisplayPost(post)}`}>
//     <ExpandMoreIcon />
//   </CardActionArea>
// </IconButton>
// <IconButton>
//   <CommentIcon fontSize='small' />
//   {post.replies.length ? post.replies.length : null}
// </IconButton> */}
// action={
//   <IconButton>
//     <MoreVertIcon />
//   </IconButton>
// }
// const likeIcons = post.likes.length ? (
//   <IconButton>
//     <FavoriteIcon fontSize='small' color='primary' />
//     {post.likes.length ? post.likes.length : null}
//   </IconButton>
// ) : (
//   <IconButton>
//     <FavoriteBorderIcon fontSize='small' color='primary' />
//     {post.likes.length ? post.likes.length : null}
//   </IconButton>
// )
