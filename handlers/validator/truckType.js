const { body } = require('express-validator')
const truckTypeModel = require('../../models/truckType')

exports.CREATE = [
    body('truckType')
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
    .custom((value, {req}) => {
        return truckTypeModel.findOne({ truckType : value})
        .then(result => {
            if(result) {
                return Promise.reject('truck type already exists')
            }
        })
    }),
    body('description')
    .isString()
    .trim()
    .toLowerCase()
    .optional()
]

exports.UPDATE = [
    body('truckType')
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
    .custom((value, {req}) => {
        return truckTypeModel.findOne({ truckType : value})
        .then(result => {
            if(result) {
                return Promise.reject('truck type already exists')
            }
        })
    }),
    body('description')
    .isString()
    .trim()
    .toLowerCase()
    .optional()
]