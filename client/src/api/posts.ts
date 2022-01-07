import axios from 'axios'

export type Post = {
  id: string
  description: string
  replies?: []
  likes?: []
  img: string
}

export async function fetchPosts(userid: string | null) {
  return axios
    .get(`http://localhost:8000/api/posts/${userid}/posts`)
    .then(res => res.data)
}

export async function likes(userid: string | null, postid: string | null, options: { id: string }) {
  return axios
    .put(`http://localhost:8000/api/posts/${userid}/posts/${postid}/likes`, options)
    .then(res => res.data)
}
