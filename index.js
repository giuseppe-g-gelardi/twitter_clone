const express = require('express')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const replyRoute = require('./routes/replies')
const dbConnect = require('./connect/dbConnect')
const cors = require('cors')

const app = express()

dbConnect()


// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/replies', replyRoute)



const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})


