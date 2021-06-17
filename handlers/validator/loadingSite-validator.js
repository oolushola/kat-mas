const { body } = require('express-validator')
const userModel = require('../../models/user')
const loadingSiteModel = require('../../models/loadingSite')

exports.CREATE = [
    body('loadingSite')
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
    .custom((value, { req }) => {
      return loadingSiteModel.findOne({ loadingSite: value })
        .then(result => {
          if(result) {
            return Promise.reject('loaading site already exists')          
          }
        })
    }),
    body('description')
    .isString()
    .trim()
    .toLowerCase()
    .optional(),
    body('createdby')
    .custom((value, { req }) => {
      return userModel.findOne({ _id: value })
        .then(result => {
          if(!result) {
            return Promise.reject('user does not exist')          
          }
        })
    })
]