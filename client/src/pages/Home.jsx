import { useContext } from "react"

import UserContext from '../context/UserContext'

export default function Home() {
  const { user } = useContext(UserContext)



  return (
    <div>
      <h1>home page</h1>
      <button onClick={() => console.log(user)}>logger</button>
    </div>
  )
}

