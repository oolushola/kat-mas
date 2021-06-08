const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const userModel = require('../models/user')
const { errorResponse, successResponse } = require('../handlers/response')
const mailer = require('../handlers/mailer')

class Auth {
  static async signUp(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation error', errors.mapped()
      )
    }
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const phoneNo = req.body.phoneNo
    const userType = req.body.userType
    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNo, 
        userType
      })
      const result = await user.save()
      const token = jwt.sign({ 
        id: result._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' 
      })
      successResponse(
        res,
        201,
        'sign up completed',
        {
          token,
          fullName: `${result.firstName} ${result.lastName}`
        }
      )
      mailer('Kaya Africa Technology, Sign Up.', email)
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static async login(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation error', errors.mapped()
      )
    }
    try {
      const user = req.user
      const { password } = req.body
      const doMatch = await bcrypt.compare(password, user.password)

      if(!doMatch) {
        return errorResponse(
          res, 409, 'invalid login', null
        )
      }
      const token = jwt.sign({ 
        id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h'
      })
      successResponse(
        res,
        200,
        'login successful',
        {
          token,
          fullName: `${user.firstName} ${user.lastName}`
        }
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }
}

module.exports = Auth