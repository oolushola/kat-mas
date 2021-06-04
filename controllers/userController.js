const { validationResult } = require('express-validator')
const userModel = require('../models/user')
const { errorResponse, successResponse } = require('../handlers/response')
const file = require('../handlers/upload')

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

  static uploadPhoto(req, res, next) {
    file.UPLOAD_PROFILE_PHOTO(req, res, async (err) => {
      if(err) {
        return errorResponse(
          res, 422, 'image upload error. maximum of 520KB allowed', err.message
        )
      }
      try{
        const photo = req.file   
        if(!photo) {
          errorResponse(
            res, 422, 'no photo choosen'
          )
        }
        const user = await userModel.findById(req.user._id)
        user.photo ? file.DELETE_PHOTO(user.photo) : null
        user.photo = req.file.path
        const result =  await user.save()
        successResponse(
          res, 200, 'photo uploaded', {
            name: `${result.firstName} ${result.lastName}`,
            photo: result.photo
          }
        )
      }
      catch(err) {
        errorResponse(
          res, 500, 'internal server error', err.message
        )
      }
    })
  }

  static async accountDetails(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation failed', errors.mapped()
      )
    }
    let { accountNo, bankName, accountName, sameAsName } = req.body
    try {
      const user = await userModel.findById(req.user._id) 
      sameAsName ? accountName = `${user.firstName} ${user.lastName}`: accountName
      if(!accountName) {
        return errorResponse(
          res, 422, 'account name is required', null
        )
      }
      user.accountDetails = {
        bankName,
        accountName,
        accountNo,
        sameAsName
      }
      const result = await user.save()
      successResponse(
        res, 200, 'account info updated', {
          name: `${result.firstName} ${result.lastName}`,
          accountDetails: result.accountDetails
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