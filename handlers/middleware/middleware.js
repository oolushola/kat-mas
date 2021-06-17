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
      const foundUser = await (
        userModel
          .findOne({ _id: verifyToken.id })
          .select('userType email _id adminStatus ')
      )
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

  static async isTransporter(req, res, next) {
    userFilter(req.user.userType, res, 'transporter', next)
  }

  static isAdmin(req, res, next) {    
    adminFilter(req.user.adminStatus.adminCategory, res, 'admin', 'superAdmin', next)
  }

  static isSuperAdmin(req, res, next) {
    userFilter(req.user.adminStatus.adminCategory, res, 'superAdmin', next)
  }

  static isStaff(req, res, next) {
    staffFilter(req.user.adminStatus.adminCategory, res, next)
  }
}

const userFilter = (userType, res, status, next) => {
  if(userType !== status) {
    return errorResponse(
      res, 403, 'you are not authorized', null
    )
  }
  next()
}

const adminFilter = (userType, res, midLevel, topTier, next) => {
  if(userType === topTier || userType === midLevel) {
    return next()
  }
  errorResponse(
    res, 403, 'you are not authorized', null
  )
}

const staffFilter = (adminCategory, res, next) => {
  if(
    adminCategory === "admin" ||
    adminCategory === "superAdmin" ||
    adminCategory === "ops" || 
    adminCategory === "finance" || 
    adminCategory === "transport" || 
    adminCategory === "fieldOps") {
    return next()
  }
  errorResponse(
    res, 403, 'you are not authorized', null
  )
}


module.exports = Middleware
