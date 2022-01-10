import axios from 'axios'

export type User = {
  id: string,
  username?: string,
  email?: string,
  password?: string,
  firstname: string,
  lastname: string,
  bio: string, 
  location: string,
  profilePicture: string,
  profileBanner: string,
  protected: boolean,
  followers: [],
  following: [],
  isAdmin: boolean,
  isVerified: boolean,
  posts: [],
  notifications: []
  theme: string,
  createdAt: string
}

export async function fetchUsers() { 
  return axios.get<User[]>(`http://localhost:8000/api/users/`)
}

export async function getUser(userid: string | null) {
  return axios.get<User[]>(`http://localhost:8000/api/users/${userid}`)
}
