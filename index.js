const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

dotenv.config()
const app = express()


mongoose.connect(process.env.DB, 
  { useNewUrlParse: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB')
})

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))



// routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)



  
app.listen(5000, () => {
  console.log('Listening on port 5000')
})

