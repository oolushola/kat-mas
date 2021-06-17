const loadingSiteModel = require('../models/loadingSite')
const { validationResult } = require('express-validator')
const { errorResponse, successResponse } = require('../handlers/response')


class loadingSite {
  static async loadingSiteCreate (req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return errorResponse(
        res, 422, 'validation failed', errors.mapped()
      )
    }
    try {
        const {
          loadingSite,
          description,
          createdBy
        } = req.body
        const site = new loadingSiteModel({
            loadingSite,
            description,
            createdBy
        })
      const result = await site.save()
      successResponse(
        res,
        201,
        'loading site created',
        {
          site: `${result.loadingSite}`
        }
      )
    }
    catch(err) {
        errorResponse(
          res, 500, 'internal server error', err.message
        )
    }
  }

  static async loadingSiteFetchAll (req, res, next) {
    try{
      const loadingSite = await loadingSiteModel.find()
      .select("-__v")
      if (loadingSite.length <= 0) {
        return errorResponse(
          res, 404, 'resource not found'
        )
      }
      successResponse(
        res,
        201,
        loadingSite
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }


  static async loadingSiteFetch (req, res, next) {
    try{
      const loadingSite = await loadingSiteModel.findById(req.params.siteId)
      .select("-__v")
      if(!loadingSite) {
        return errorResponse(
          res, 404, 'resource not found'
        )        
      }
      successResponse(
        res,
        201,
        loadingSite
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }


  static async loadingSiteEdit (req, res, next) {
    try {
      const site = await loadingSiteModel.findById(req.params.siteId)
      if(!site) {
        return errorResponse(
          res, 404, 'resource not found'
        )
      }
      const { loadingSite, description } = req.body
      site.loadingSite = loadingSite
      site.description = description
      const update = await site.save()
      successResponse(
        res,
        200,
        'loading site updated', {
          update
        }
      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

  static async loadingSiteDelete (req, res, next) {
    try{
      const loadingSite = await loadingSiteModel.findById(req.params.siteId)
      if(loadingSite) {
          res, 404, 'resource not found'          
      }
      await loadingSite.delete()
      successResponse(
        res,
        201,
      'loading site deleted',

      )
    }
    catch(err) {
      errorResponse(
        res, 500, 'internal server error', err.message
      )
    }
  }

}

module.exports = loadingSite
