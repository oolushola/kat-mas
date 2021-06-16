const Tonnage = require('../models/tonnage')
const { validationResult } = require('express-validator')
const { errorResponse, successResponse } = require('../handlers/response')
const dotenv = require('dotenv').config()

class TonnageController {
  static async tonnages(req, res, next) {
    const PAGE = Number(process.env.CURRENT_PAGE || req.query.currentPage)
    const PER_PAGE = Number(process.env.LIMIT || req.query.limit)
    const LIMIT = (PAGE - 1) * PER_PAGE
    try {
      const tonnages = await (
        Tonnage
        .find()
        .skip(LIMIT)
        .limit(PER_PAGE)
        .populate('createdBy', 'firstName lastName')
        .sort({ tonnage: 'asc' })
      )
      let response
      if(tonnages.length <= 0) {  
        response = 'no tonnage yet'
      }
      else {
        response = 'tonnage resources'
      }
      successResponse(
        res, 200, response, tonnages
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static async createTonnage(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation failed', errors.mapped()
      )
    }
    try {
      const { tonnage } = req.body
      const createTonnage = new Tonnage({
        tonnage,
        createdBy: req.user._id
      })
      const result = await createTonnage.save()
      successResponse(
        res, 201, 'tonnage resource created', result
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static async getTonnage(req, res, next) {
    const tonnageId = req.params.tonnageId
    try {
      const tonnage = await Tonnage.findById(tonnageId).populate('createdBy', 'firstName lastName')
      if(!tonnage) {
        return errorResponse(
          res, 404, 'resource not found'
        )
      }
      successResponse(
        res, 200, 'tonnage info', tonnage
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static async updateTonnage(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation failed', errors.mapped()
      )
    }
    try {
      const tonnageId = req.params.tonnageId
      const { tonnage } = req.body
      const checkAvailability = await Tonnage.findById(tonnageId)
      if(!checkAvailability) {
        return errorResponse(
          res, 404, 'resource not found'
        )
      }
      if(checkAvailability.id !== tonnageId && checkAvailability.tonnage === tonnage) {
        return errorResponse(
          res, 409, 'record exists'
        )
      }
      checkAvailability.tonnage = tonnage
      const result = await checkAvailability.save()
      successResponse(
        res, 200, 'resource updated', result
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }
}

module.exports = TonnageController