const {body} = require('express-validator')
const truckModel = require('../../models/trucks')
const tonnageModel = require('../../models/tonnage')
const userModel = require('../../models/user')

exports.CREATE = [
    body('truckNo')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase()
    .custom((value, {req}) => {
        return truckModel.findOne({truckNo: value})
        .then (result => {
            if(result) {
                return Promise.reject('truck already exists')
            }
        })
    }),
    body('tonnage')
    .trim()
    .isMongoId()
    .notEmpty()
    .custom((value, {req}) => {
        return tonnageModel.findOne({_id: value})
        .then(result => {
            if (!result) {
                return Promise.reject('resource not found')
            }
        })
    }),
    body('transporterId')
    .trim()
    .isMongoId()
    .notEmpty()
    .custom((value, {req}) => {
        return userModel.findOne({_id: value, userType: 'transporter'})
        .then(result => {
            if (!result) {
                return Promise.reject('resource not found')
            }
        })
    })
]

exports.UPDATE = [
    body('truckNo')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase()
    .custom((value, {req}) => {
        return truckModel.findOne({truckNo: value})
        .then (result => {
            if(result) {
                return Promise.reject('truck already exists')
            }
        })
    }),
    body('tonnage')
    .trim()
    .isMongoId()
    .notEmpty()
    .custom((value, {req}) => {
        return tonnageModel.findOne({_id: value})
        .then(result => {
            if (!result) {
                return Promise.reject('resource not found')
            }
        })
    }),
    body('transporterId')
    .trim()
    .isMongoId()
    .notEmpty()
    .custom((value, {req}) => {
        return userModel.findOne({_id: value, userType: 'transporter'})
        .then(result => {
            if (!result) {
                return Promise.reject('resource not found')
            }
        })
    })
]