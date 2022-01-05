import { useContext } from "react"
import UserContext from "../context/UserContext"
import GetUserPosts from "../components/GetUserPosts"
import CreatePost from "../components/CreatePost"
import Profile from "./Profile"

export default function Home() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>{user.username}'s home page</h1>
      <Profile />
      <CreatePost />
      <GetUserPosts />
    </div>
  )
}

