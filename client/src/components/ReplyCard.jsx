import {
  Card,
  CardHeader,
  Avatar,
  CardContent
} from '@material-ui/core'

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
