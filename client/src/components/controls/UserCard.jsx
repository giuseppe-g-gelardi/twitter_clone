// import React, { useState } from 'react'
// import {
//   Avatar,
//   ButtonGroup,
//   Button,
//   Card,
//   Container,
//   CardContent,
//   CardHeader,
//   IconButton,
//   Typography
// } from '@material-ui/core'
// import Controls from './Controls'
// import ViewFriendProfile from '../ViewFriendProfile'

// export default function UserCard (props) {
//   const {
//     friends,
//     firstName,
//     lastName,
//     dateJoined,
//     sendAction,
//     buttonTextLeft,
//     buttonTextRight,
//     viewProfile
//   } = props
//   const [openPopup, setOpenPopup] = useState(false)

//   return (
//     <Container>
//       <Card elevation={5} key={firstName}>
//         <CardHeader
//           avatar={
//             <Avatar color='primary'>
//               {firstName[0]}
//               {lastName[0]}
//             </Avatar>
//           }
//           action={
//             <ButtonGroup variant='contained'>
//               <IconButton>
//                 <Button color='primary' onClick={sendAction}>
//                   {buttonTextLeft}
//                 </Button>
//               </IconButton>

//               <IconButton>
//                 <Button
//                   color='primary'
//                   onClick={() =>
//                     `${viewProfile(friends)}${console.log(
//                       friends
//                     )}${setOpenPopup(true)}`
//                   }
//                 >
//                   {buttonTextRight}
//                 </Button>
//               </IconButton>
//             </ButtonGroup>
//           }
//         />
//         <CardContent>
//           <Typography variant='body2' color='textSecondary'>
//             {firstName} {lastName}
//           </Typography>

//           <Typography variant='body2' color='textSecondary'>
//             member since {dateJoined}
//           </Typography>
//         </CardContent>
//       </Card>
//       <Controls.Popup
//         text='friends profile'
//         openPopup={openPopup}
//         setOpenPopup={setOpenPopup}
//       >
//         <ViewFriendProfile
//           firstName={firstName}
//           lastName={lastName}
//           dateJoined={dateJoined}
//           friends={friends}
//           viewProfile={viewProfile}
//           posts={friends.posts}
//         />
//       </Controls.Popup>
//     </Container>
//   )
// }
