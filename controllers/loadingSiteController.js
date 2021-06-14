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
        res, 400, 'client side error', err.message
        )
    }
  }

  static async loadingSiteFetchAll (req, res, next) {
    try{
      await loadingSiteModel.find()
      .select("_id loadingSite description createdAt updatedAt")
      .then((docs) => {
        const result = {
          count: docs.length,
          loadingSites: docs,
        };
        successResponse(
          res,
          201,
          {
            sites: result
          }
        )
      })
    }
    catch(err) {
      errorResponse(
      res, 400, 'client side error', err.message
      )
    }
  }


  static async loadingSiteFetch (req, res, next) {
    try{
      await loadingSiteModel.findById(req.params.siteId)
      .select("_id loadingSite description createdAt updatedAt")
      .then((docs) => {
        if(!docs) {
          return Promise.reject('invalid loading site')          
        }
        successResponse(
          res,
          201,
          docs
        )
      })
    }
    catch(err) {
      errorResponse(
      res, 400, 'client side error', err.message
      )
    }
  }


  static async loadingSiteEdit (req, res, next) {
    try {
      await loadingSiteModel.findById(req.params.siteId)
      .then((site) => {
        if(!site) {
          return Promise.reject('invalid loading site')          
        }
        const { loadingSite, description } = req.body
        site.loadingSite = loadingSite
        site.description = description
        site.save()
        successResponse(
          res,
          200,
          'loading site updated', {
            site
          }
        )
      })
    }
    catch(err) {
      errorResponse(
      res, 400, 'client side error', err.message
      )
    }
  }

  static async loadingSiteDelete (req, res, next) {
    try{
      await loadingSiteModel.findById(req.params.siteId)
      .then((docs) => {
        if(!docs) {
          return Promise.reject('invalid loading site')          
        }
        docs.delete()
        successResponse(
          res,
          201,
        'loading site deleted',
          {docs}
        )
      })
    }
    catch(err) {
      errorResponse(
      res, 400, 'client side error', err.message
      )
    }
  }

}

module.exports = loadingSite
