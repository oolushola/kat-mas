const { body } = require('express-validator')
const availableCargoModel = require('../../models/availableCargo')
const userModel = require('../../models/user')

exports.CREATE = [
body('clientId')
.notEmpty()
.trim()
.isMongoId()
.custom((value, {req}) => {
    return userModel.findById(value)
    .then(result => {
        if (!result) {
            return Promise.reject('resource not found')
        }
    })
}),

body('expectedTrucks')
.notEmpty()
.trim()
.isNumeric(),

body('customer')
.notEmpty()
.trim()
.isString()
.toLowerCase(),

body('destination.state')
.notEmpty()
.trim()
.isString()
.toLowerCase(),

body('destination.exactLocation')
.isArray()
.isLength({ min: 1 }),

body('availabilityStatus')
.notEmpty()
.isBoolean()
]

exports.UPDATE = [
    body('clientId')
    .notEmpty()
    .trim()
    .isMongoId()
    .custom((value, {req}) => {
        return userModel.findById(value)
        .then(result => {
            if (!result) {
                return Promise.reject('resource not found')
            }
        })
    }),

    body('expectedTrucks')
    .notEmpty()
    .trim()
    .isNumeric(),

    body('customer')
    .notEmpty()
    .trim()
    .isString()
    .toLowerCase(),

    body('destination.state')
    .notEmpty()
    .trim()
    .isString()
    .toLowerCase(),

    body('destination.exactLocation')
    .isArray()
    .isLength({ min: 1 }),

    body('availabilityStatus')
    .notEmpty()
    .isBoolean()
]