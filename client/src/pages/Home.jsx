// import { useContext } from "react"

// import UserContext from "../context/UserContext"
import GetUserPosts from "../components/GetUserPosts"
import CreatePost from "../components/CreatePost"
import CommentCards from "../components/CommentCards"

export default function Home() {
  // const { user } = useContext(UserContext)

  return (
    <div>
      {/* <h1>home page</h1>
      <button onClick={() => console.log(user)}>logger</button> */}
      <CreatePost />
      <GetUserPosts />
      <CommentCards />
    </div>
  )
}

