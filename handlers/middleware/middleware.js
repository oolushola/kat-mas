const jwt = require('jsonwebtoken')
const { errorResponse } = require('../response')
const dotenv = require('dotenv').config()
const userModel = require('../../models/user')

class Middleware {
  static async checkAuth(req, res, next) {
    const bearearToken = req.headers.authorization
    if(!bearearToken) {
      return errorResponse( 
        res, 401, 'no token', null
      )
    }
    try {
      const token = bearearToken.split(' ')[1]
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
      if(!verifyToken) {
        return errorResponse(
          res, 401, 'invalid signature token', null
        )
      }
      const foundUser = await userModel.findOne({ _id: verifyToken.id }).select('userType email _id ')
      if(!foundUser) {
        return errorResponse(
          res, 404, 'user not found', null
        )
      }
      req.user = foundUser
      next()  
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static async checkUserType(req, res, next) {
    const userType = req.user.userType
    if(userType !== 'transporter') {
      return errorResponse(
        res, 403, 'you are not authorized', null
      )
    }
    next()
  }
}

module.exports = Middleware