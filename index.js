const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

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

app.get('/', (req, res) => {
  res.send('welcome to home page')
})

  
app.listen(5000, () => {
  console.log('Listening on port 5000')
})

