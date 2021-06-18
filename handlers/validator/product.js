const { body } = require('express-validator')
const userModel = require('../../models/user')
const productModel = require('../../models/product')

exports.CREATE = [
    body('product')
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
    .custom((value, { req }) => {
      return productModel.findOne({ product: value })
        .then(result => {
          if(result) {
            return Promise.reject('product already exists')          
          }
        })
    }),
    body('description')
    .isString()
    .trim()
    .toLowerCase()
    .optional()
]