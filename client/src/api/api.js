export const GetLoggedInPosts = async(userid) => {
  const res = await fetch(`http://localhost:8000/api/posts/${userid}/posts`)
  const posts = res.json()

  if (!posts) {
    console.log('something went wrong bruv')
  }

  return JSON.stringify(posts)
}
