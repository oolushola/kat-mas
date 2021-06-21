const trucksModel = require('../models/trucks')
const { validationResult } = require('express-validator')
const { errorResponse, successResponse } = require('../handlers/response')

class trucks {
    static async truckCreate (req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return errorResponse(
            res, 422, 'validation failed', errors.mapped()
            )
        }
        try {
            const {
                truckNo,
                tonnage,
                transporterId,
            } = req.body
            const createdBy = req.user.id
            const newTruck = new trucksModel({
                truckNo,
                tonnage,
                transporterId,
                createdBy
            })
            const result = await newTruck.save()
            successResponse(
                res,
                201,
                'truck created',
                { truck : newTruck }
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

    static async truckFetchAll (req, res, next) {
        try{
            const trucks = await trucksModel.find()
            .select("-__v")
            .populate('tonnage transporterId createdBy', 'firstName lastName email tonnage')
            
            if(trucks.length <= 0) {
                return errorResponse(
                    res, 404, 'resource not found'
                )
            }
            successResponse(
                res, 201, trucks
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

    static async truckFetchOne (req, res, next) {
        try{
            const truck = await trucksModel.findById(req.params.truckId)
            .select("-__v")
            .populate('tonnage transporterId createdBy', 'firstName lastName email tonnage')
            if(!truck) {
                return errorResponse(
                    res, 404, 'resource not found'
                )
            }
            successResponse(
                res, '201', truck
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

    static async truckEdit (req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return errorResponse(
            res, 422, 'validation failed', errors.mapped()
            )
        }
        try {
            const docs = await trucksModel.findById(req.params.truckId)
            if (!docs) {
                return errorResponse(
                    res, 404, 'resource not found'
                )
            }
            const {
                truckNo,
                tonnage,
                transporterId,
            } = req.body
            docs.truckNo = truckNo
            docs.tonnage = tonnage
            docs.transporterId = transporterId
            const update = await docs.save()
            successResponse(
                res,
                201,
                'truck updated',
                { update }
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

    static async truckDelete (req, res, next) {
        try {
            const truck = await trucksModel.findById(req.params.truckId)
            if(!truck) {
                return errorResponse(
                    res, 404, "resource not found"
                )
            }
            await truck.delete()
            successResponse(
                res,
                201,
                'truck deleted'
            )
        }
        catch(err) {
            errorResponse(
                res, 500, 'internal server error', err.message
            )
        }
    }
}


module.exports = trucks