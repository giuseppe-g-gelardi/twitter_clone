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
    .get<Post[]>(`http://localhost:8000/api/posts/${userid}/posts`)
    .then(res => res.data)
}

export async function fetchSinglePost(userid: string | null, postid: string | null) {
  return axios
    .get<Post[]>(`http://localhost:8000/api/posts/${userid}/posts/${postid}`)
    .then(res => res.data)
}

export async function likes(userid: string, postid: string, options: { id: string }) {
  return axios
    .put(`http://localhost:8000/api/posts/${userid}/posts/${postid}/likes`, options)
    .then(res => res.data)
}

export async function deletePost(userid: string, postid: string) {
  try {
    return axios
      .delete(`http://localhost:8000/api/posts/${userid}/posts/${postid}`)
      .then(res => res.data)
  } catch (error) {
    throw new Error(error + ' Something went wrong')
  }
}

// http://localhost:8000/api/posts/${userid}/posts/${postid}
