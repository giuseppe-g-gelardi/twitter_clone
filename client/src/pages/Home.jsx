// import { useContext } from "react"
// import UserContext from "../context/UserContext"
import GetUserPosts from "../components/GetUserPosts"
import CreatePost from "../components/CreatePost"
import Profile from "./Profile"

export default function Home() {
  // const { user } = useContext(UserContext)

  return (
    <div>
      <Profile />
      <CreatePost />
      <GetUserPosts />
    </div>
  )
}

