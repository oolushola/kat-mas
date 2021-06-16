const { body } = require('express-validator')
const Tonnage = require('../../models/tonnage')

exports.ADD_TONNAGE = [
  body('tonnage')
    .isNumeric()
    .notEmpty()
    .trim()
    .custom((value, { req }) => {
      return Tonnage.findOne({ tonnage: value }).then(tonnage => {
        if(tonnage) {
          return Promise.reject('resource already exists')
        }
        return true
      })
    })
]

exports.UPDATE_TONNAGE = [
  body('tonnage')
    .isNumeric()
    .notEmpty()
    .trim()
    .custom((value, { req }) => {
      return Tonnage
        .find({ tonnage: value, _id: { $ne: req.params.tonnageId } })
        .then(response => {
          if(response.length > 0) {
            return Promise.reject('resource already exists ')
          }
        })
        return true
    }),
]