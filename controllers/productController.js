const productModel = require('../models/product')
const { validationResult } = require('express-validator')
const { errorResponse, successResponse } = require('../handlers/response')


class product {
    static async productCreate (req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return errorResponse(
            res, 422, 'validation failed', errors.mapped()
            )
        }
        try {
            const{
                product,
                description,
            } = req.body
            const createdBy = req.user.id
            const newProduct = new productModel({
                product,
                description,
                createdBy
            })
            const result = await newProduct.save()
            successResponse(
                res,
                201,
                'product created',
                {
                product: newProduct
                }
            )
        }
        catch(err) {
            errorResponse(
              res, 500, 'internal server error', err.message
            )
        }
    }


    static async productFetchAll (req, res, next) {
        try {
            const product = await productModel.find()
            .select("-__v")
            if (product.length <= 0) {
                return errorResponse(
                res, 404, 'resource not found'
                )
            }
            successResponse(
                res,
                201,
                product
            )
        }
        catch(err) {
            errorResponse(
              res, 500, 'internal server error', err.message
            )
          }
    }

    
    static async productFetchOne (req, res, next) {
        try {
            const product = await productModel.findById(req.params.productId)
            if(!product) {
                return errorResponse(
                  res, 404, 'resource not found'
                )        
              }
              successResponse(
                res,
                201,
                product
              )
        }
        catch(err) {
            errorResponse(
              res, 500, 'internal server error', err.message
            )
        }
        }


        static async productEdit (req, res, next) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return errorResponse(
                res, 422, 'validation failed', errors.mapped()
                )
            }
            try {
                const prod = await productModel.findById(req.params.productId)
                if(!prod) {
                    return errorResponse(
                    res, 404, 'resource not found'
                    )
                }
                const { product, description } = req.body
                prod.product = product
                prod.description = description
                const update = await prod.save()
                successResponse(
                    res,
                    200,
                    'product updated', {
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

        static async productDelete (req, res, next) {
            try {
                const product = await productModel.findById(req.params.productId)
                if (!product) {
                    return errorResponse (
                        res, 404, 'resource not found'
                    )
                }
                await product.delete()
                successResponse(
                    res, 201, 'product deleted' 
                )
            }
            catch(err) {
                errorResponse(
                  res, 500, 'internal server error', err.message
                )
            }
        }

}

module.exports = product