const { body } = require('express-validator')

exports.GUARANTOR = [
  body('firstName')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase(),
  body('lastName')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase(),
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .trim()
    .toLowerCase(),
  body('phoneNo')
    .isLength({ min: 1 })
    .isArray()
    .notEmpty()
    .isMobilePhone()
    .trim(),
  body('address')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase(),
  body('occupation')
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase(),
  body('workAddress')
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
]

exports.NEXT_OF_KIN = [
  body('firstName')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase(),
  body('lastName')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .trim()
    .toLowerCase()
    .optional(),
  body('phoneNo')
    .isLength({ min: 1 })
    .isArray()
    .isMobilePhone()
    .trim()
    .optional(),
  body('address')
    .notEmpty()
    .isString()
    .trim()
    .toLowerCase(),
]




