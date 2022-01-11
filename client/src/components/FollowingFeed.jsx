import { useContext, useState, useEffect } from 'react'

import UserContext from '../context/UserContext'
import UserPost from './UserPost'
import { fetchPosts } from '../api/posts.ts'
import { feed } from '../api/users.ts'

export default function FollowingFeed () {
  const { user } = useContext(UserContext)
  const [postsWithUserInfo, setPostsWithUserInfo] = useState([])
  const [followingPosts, setFollowingPosts] = useState([])

  useEffect(() => {
    if (!user._id) return
    feed(user._id)
      .then(res => setPostsWithUserInfo(res.data))
      .catch(err => err, ' error getting feed')
  }, [user])

  return (
    <div>
      <h1>feed from the people i follow</h1>
      <h1>following</h1>
      {postsWithUserInfo
      .sort((a, b) => new Date(b.post.createdAt) - new Date(a.post.createdAt))
      .map(comboObject => (
        <li key={comboObject.post._id}>
          <strong>
          {comboObject.user.username}{' says: '}
          </strong>
          {comboObject.post.description}
          {/* @{new Date(comboObject.post.createdAt) } */}
        </li>
      ))}
    </div>
  )
}

// return (
//   <>
//     {displaySinglePost ? (
//       <>
//         <SinglePost
//           key={user._id}
//           user={user}
//           post={displayPost}
//           setDisplaySinglePost={setDisplaySinglePost}
//           likeUnlike={likeUnlike}
//         />
//       </>
//     ) : (
//       <>
//         {posts
//          // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//          postsWithUserInfo.sort((a, b) => new Date(b.post.createdAt) - new Date(a.post.createdAt))
//         .map(post => (
//           <Post
//           key={post._id}
//           user={user}
//           post={post}
//           setDisplaySinglePost={setDisplaySinglePost}
//           setDisplayPost={setDisplayPost}
//           likeUnlike={likeUnlike}
//           />
//           ))}
//       </>
//     )}
//   </>
// )
//
