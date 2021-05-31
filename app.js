const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use((error, req, res, next) => {
  const status = error.statusCode
  const errMessage = error.message
  const errors = error.errors
  res.status(status).json({
    response: errMessage,
    errors,
    statusCode: status
  })
})

app.use('*', (req, res, next) => {
  res.json(404).json({
    statusCode: 404,
    response: 'resource not found'
  })
})


mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${process.env.PORT}`)
  })
})
.catch(err => {
  console.log(err.message)
})


