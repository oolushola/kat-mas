const { validationResult } = require('express-validator')
const userModel = require('../models/user')
const { errorResponse, successResponse } = require('../handlers/response')

class User {
  static async guarantorUpdate(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation failed', errors.mapped()
      )
    }
    try {
      const {
        firstName, 
        lastName, 
        email, 
        phoneNo, 
        address, 
        occupation, 
        workAddress 
      } = req.body
      const user = await userModel.findById(req.user._id)
      user.guarantor = {
        firstName, 
        lastName, 
        email, 
        phoneNo, 
        address,
        occupation,
        workAddress
      }
      const result = await user.save()
      successResponse(
        res, 200, 'guarantor info updated', {
          name: `${result.firstName} ${result.lastName}`,
          guarantor: result.guarantor
        }
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static async nextOfKinUpdate(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation failed', errors.mapped()
      )
    }
    try {
      const { firstName, lastName, email, phoneNos, address } = req.body
      const user = await userModel.findById(req.user._id)
      user.nextOfKin = {
        firstName,
        lastName,
        email,
        phoneNo: phoneNos,
        address
      }
      const result = await user.save()
      successResponse(
        res, 200, 'next of kin info updated', {
          name: `${result.firstName} ${result.lastName}`,
          nextOfKin: result.nextOfKin
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

module.exports = User