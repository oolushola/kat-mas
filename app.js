const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv').config()
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public/users', express.static(path.join(__dirname, 'public/users')))
app.use('/public/documents/nin', express.static(path.join(__dirname, 'public/documents/nin')))
app.use('/public/documents/poa', express.static(path.join(__dirname, 'public/documents/poa')))
app.use('/public/documents/guarantor', express.static(path.join(__dirname, 'public/documents/guarantor')))

app.use(express.static(path.join(__dirname, 'public/images')))
app.use(express.static(path.join(__dirname, 'public/users')))
app.use(express.static(path.join(__dirname, 'public/documents/nin')))
app.use(express.static(path.join(__dirname, 'public/documents/poa')))
app.use(express.static(path.join(__dirname, 'public/documents/guarantor')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
app.use(process.env.BASE_URL, routes)

app.use('*', (req, res, next) => {
  return res.status(404).json({
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


