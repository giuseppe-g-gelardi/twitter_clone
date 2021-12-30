import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function SinglePost() {
  const [post, setPost] = useState()
  const { id } = useParams()
  const { postid } = useParams()
  const api = `http://localhost:8000/api/posts/${id}/posts/${postid}`
  // user._id: 61baaced780cf3e51957becb 
  // post._id: 61bf9421edeffdd6a70738a6
  useEffect(() => getPost(), [])

  const getPost = async () => {
    try {
      await axios
        .get(api)
        .then((response => 
          `${setPost(response.data)}
          ${console.log(response.data)}`))
    } catch {
      throw new Error('Something went wrong, I think... lol')
    }
  }

  

  return (
    <div>
      <h1>single post view!</h1>
      <h2>{post[0].description}</h2>
    </div>
  )
}
