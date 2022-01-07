import axios from 'axios'

export type Reply = {
  text: string,
  user: string
}

export async function fetchReplies(userid: string | null, postid: string | null) {
  return axios
    .get(`http://localhost:8000/api/posts/${userid}/posts/${postid}/replies`)
    .then(res => res.data)
}


