const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require("./routes/auth")
const dbConnect = require('./connect/dbConnect')

const app = express()

dbConnect()



// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))



// routes
app.use("/api/auth", authRoute)
app.use('/api/users', userRoute)



const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})


