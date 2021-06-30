const userModel = require('../models/user')
const { validationResult } = require('express-validator')
const { successResponse, errorResponse } = require('../handlers/response')

class AssignmentController {
  static async assignProducts(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation failed', errors.mapped()
      )
    }
    const { clientId, products } = req.body
    try {
      userAssignment(
        res, clientId, `products`, products, 'product'
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static assignLoadingSites(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation failed', errors.mapped()
      )
    }
    const { clientId, loadingSites } = req.body
    try {
      userAssignment(res, clientId, `loadingSites`, loadingSites, 'loading site')
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static async getBusinessDetails(req, res, next) {
    const clientId = req.query.identity
    const PER_PAGE = req.query.PER_PAGE || process.env.LIMIT
    const CURRENT_PAGE = req.query.PAGE || process.env.CURRENT_PAGE
    try {
      const businessInfo = await userModel
        .findById(clientId)
        .select('-__v -password')
        .populate(
          'assigned.products assigned.loadingSites', 'product loadingSite'
        )
        .skip((CURRENT_PAGE - 1) * PER_PAGE)
        .limit(PER_PAGE)
      successResponse(
        res, 200, 'business details', businessInfo,
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }
}

const userAssignment = async (res, client, params, arrayValues, label) => {
  const clientInfo = await userModel.findById(client).select('-__v -password')
  const existingParams = clientInfo.assigned[params]
  arrayValues.map(assignValue => {
    const paramIndex = existingParams.findIndex(exisitingParam => (
      exisitingParam == assignValue
    ))
    if(paramIndex < 0) {
      existingParams.push(assignValue)
    }
  })
  const result = await clientInfo.save()
  successResponse(
    res, 200, `${label} added`, result
  )
}

module.exports = AssignmentController