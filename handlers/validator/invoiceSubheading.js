const { body } = require('express-validator')
const userModel = require('../../models/user')
const invoiceSubheadingModel = require('../../models/invoiceSubheading')

exports.CREATE = [
    body('clientId')
    .notEmpty()
    .trim()
    .isMongoId()
    .custom((value, {req}) => {
        return userModel.findOne({_id: value, userType: 'business'})
        .then(result => {
            if (!result) {
                return Promise.reject('resource not found')
            }
        })
    }),
    body('replaceSalesOrderNo')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase(),
    body('replaceInvoiceNo')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase()
]

exports.UPDATE = [
    body('clientId')
    .notEmpty()
    .trim()
    .isMongoId()
    .custom((value, {req}) => {
        return userModel.findOne({_id: value, userType: 'business'})
        .then(result => {
            if (!result) {
                return Promise.reject('resource not found')
            }
        })
    }),
    body('replaceSalesOrderNo')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase(),
    body('replaceInvoiceNo')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase()
]