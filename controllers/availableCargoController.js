const availableCargoModel = require('../models/availableCargo')
const { validationResult } = require('express-validator')
const { errorResponse, successResponse } = require('../handlers/response')

class availableCargo {
    static async availableCargoCreate (req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return errorResponse(
            res, 422, 'validation failed', errors.mapped()
            )
        }
        try {
            const {
                clientId,
                expectedTrucks,
                customer,
                destination,
                availabilityStatus
            } = req.body
            const createdBy = req.user.id
            const newAvailableCargo = new availableCargoModel({
                clientId,
                expectedTrucks,
                customer,
                destination,
                availabilityStatus,
                createdBy
            })
            const result = await newAvailableCargo.save()
            successResponse(
                res,
                201,
                'available cargo created',
                { availableCargo : newAvailableCargo}
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


    static async availableCargoFetchAll (req, res, next) {
        try {
            const availableCargo = await availableCargoModel.find()
            .select('-__v')
            .populate('clientId createdBy', 'firstName lastName email')
            if (availableCargo.length <= 0) {
                return errorResponse(
                    res, 404, 'resource not found'
                )
            } 
            successResponse(
                res, 201, availableCargo
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


    static async availableCargoFetchOne (req, res, next) {
        try {
            const availableCargo = await availableCargoModel.findById(req.params.cargoId)
            .select('-__v')
            .populate('clientId createdBy', 'firstName lastName email')
            if (!availableCargo) {
                return errorResponse(
                    res, 404, 'resource not found'
                )
            }
            successResponse(
                res, 201, availableCargo
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


    static async availableCargoEdit (req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return errorResponse(
            res, 422, 'validation failed', errors.mapped()
            )
        }
        try {
            const docs = await availableCargoModel.findById(req.params.cargoId)
            if (!docs) {
                return errorResponse(
                    res, 404, 'resource not found'
                )
            }
            const {
                clientId,
                expectedTrucks,
                customer,
                destination,
                availabilityStatus
            } = req.body
            docs.clientId = clientId
            docs.expectedTrucks = expectedTrucks
            docs.customer = customer
            docs.destination = destination
            docs.availabilityStatus = availabilityStatus
            const update = await docs.save()
            successResponse(
                res,
                201,
                'available cargo updated',
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


    static async availableCargoDelete (req, res, next) {
        try {
            const availableCargo = await availableCargoModel.findById(req.params.cargoId)
            if (!availableCargo) {
                return errorResponse(
                    res, 404, 'resource not found'
                )
            }
            await availableCargo.delete()
            successResponse(
                res,
                201,
                'cargo deleted'
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
}

module.exports = availableCargo
