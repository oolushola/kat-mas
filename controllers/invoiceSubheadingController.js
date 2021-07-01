    const invoiceSubheadingModel = require('../models/invoiceSubheading')
    const { validationResult } = require('express-validator')
    const { errorResponse, successResponse } = require('../handlers/response')


    class invoiceSubheading {
        static async invoiceSubheadingCreate (req, res, next) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return errorResponse(
                res, 422, 'validation failed', errors.mapped()
                )
            }
            try {
                const {
                    clientId,
                    replaceSalesOrderNo,
                    replaceInvoiceNo
                } = req.body
                const createdBy = req.user.id

                const newInvoiceSubheading = new invoiceSubheadingModel({
                    clientId,
                    replaceSalesOrderNo,
                    replaceInvoiceNo,
                    createdBy
                })
                const result = await newInvoiceSubheading.save()
                successResponse(
                    res,
                    201,
                    'invoice subheading created',
                    {InvoiceSubheading : newInvoiceSubheading}
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

        static async invoiceSubheadingFetchAll (req, res, next) {
            try {
                const invoiceSubheading = await invoiceSubheadingModel.find()
                .select('-__v')
                .populate('clientId createdBy', 'firstName lastName email')
                if (invoiceSubheading.length <= 0) {
                    errorResponse(
                        res, 404, 'resource not found'
                    )
                }
                successResponse(
                    res, 201, invoiceSubheading
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

        static async invoiceSubheadingFetchOne (req, res, next) {
            try {
                const invoiceSubheading = await invoiceSubheadingModel.findById(req.params.invoiceId)
                .select('-__v')
                .populate('clientId createdBy', 'firstName lastName email')
                if (!invoiceSubheading) {
                    errorResponse(
                        res, 404, 'resource not found'
                    )
                }
                successResponse(
                    res, 201, invoiceSubheading
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

        static async invoiceSubheadingEdit (req, res, next) {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return errorResponse(
                res, 422, 'validation failed', errors.mapped()
                )
            }
            try {
                const docs = await invoiceSubheadingModel.findById(req.params.invoiceId)
                .select('-__v')
                .populate('clientId createdBy', 'firstName lastName email')
                if (!docs) {
                    errorResponse(
                        res, 404, 'resource not found'
                    )
                }
                const {
                    clientId,
                    replaceSalesOrderNo,
                    replaceInvoiceNo
                } = req.body
                docs.clientId = clientId
                docs.replaceSalesOrderNo = replaceSalesOrderNo
                docs.replaceInvoiceNo = replaceInvoiceNo
                const update = await docs.save()
            successResponse(
                res,
                201,
                'invoice subheading updated',
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

        static async invoiceSubheadingDelete (req, res, next) {
            try {
                const invoiceSubheading = await invoiceSubheadingModel.findById(req.params.invoiceId)
                if (!invoiceSubheading) {
                    errorResponse(
                        res, 404, 'resource not found'
                    )
                }
                await invoiceSubheading.delete()
                successResponse(
                    res,
                    201,
                    'invoice subheading deleted'
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

    module.exports = invoiceSubheading