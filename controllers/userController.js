const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const userModel = require('../models/user')
const { errorResponse, successResponse } = require('../handlers/response')

class User {
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
    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNo
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
    }
    catch(err) {
      errorResponse(
        res, 500, err.message, null
      )
    }
  }
}

module.exports = User