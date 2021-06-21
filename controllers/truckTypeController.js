const truckTypeModel = require('../models/truckType')
const userModel = require('../models/user')
const { validationResult} = require('express-validator')
const { errorResponse, successResponse } = require('../handlers/response')


class truckType {
    static async truckTypeCreate (req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return errorResponse(
            res, 422, 'validation failed', errors.mapped()
            )
        }
        try {
            const {
                truckType,
                description
            } = req.body
            const createdBy = req.user.id
            const newTruckType = new truckTypeModel ({
                truckType,
                description,
                createdBy
            })
            const result = await newTruckType.save()
            successResponse(
                res,
                201,
                'new truck type created',
                {
                    truckTpe: newTruckType
                }
            )
        }
        catch(err) {
            errorResponse(
                res,
                500,
                'internal server error',
                err.message
            )
        }
    }

    static async truckTypeFetchAll (req, res, next) {
        try{
            const truckType = await truckTypeModel.find()
            .select("-__v")
            .populate('createdBy', 'firstName lastName email')
            if(truckType.length <= 0) {
                return errorResponse(
                    res, 404, 'resource not found'
                )
            }
            successResponse (
                res, '201', truckType
            )
        }
        catch (err) {
            errorResponse(
                res, 500, 'internal server error', err.message
            )
        }
    }


    static async truckTypeFetchOne (req, res, next) {
        try{
            const truckType = await truckTypeModel.findById(req.params.truckTypeId)
            .select("-__v")
            .populate('createdBy', 'firstName lastName email')
            if(!truckType) {
                return errorResponse (
                    res, '404', 'resource not found'
                )
            }
            successResponse(
                res, '201', truckType
            )
        }
        catch(err) {
            errorResponse(
                res, 500, 'internal server error', err.message
            )
        }
    }


    static async truckTypeEdit (req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return errorResponse(
            res, 422, 'validation failed', errors.mapped()
            )
        }
        try{
            const docs = await truckTypeModel.findById(req.params.truckTypeId)
            if(!docs) {
                return errorResponse(
                    res, 404, "resource not found"
                )
            }
            const {truckType, description} = req.body
            docs.truckType = truckType
            docs.description = description
            const update = await docs.save()
            successResponse(
                res,
                201,
                'truck type updated',
                { update }
            )
        }
        catch(err) {
            errorResponse(
                res, 500, 'internal server error', err.message
            )
        }
    }


    static async truckTypeDelete ( req, res, next) {
        try {
            const truckType = await truckTypeModel.findById(req.params.truckTypeId)
            if(!truckType) {
                return errorResponse(
                    res, 404, "resource not found"
                )
            }
            await truckType.delete()
            successResponse(
                res,
                201,
                'truck type deleted'
            )
        }
        catch(err) {
            errorResponse(
                res, 500, 'internal server error', err.message
            )
        }
    }
}


module.exports = truckType