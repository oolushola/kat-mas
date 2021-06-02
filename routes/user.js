const express = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/userController')
const router = express.Router()
const userModel = require('../models/user')

router.post(
  '/sign-up',
  [
    body('firstName')
      .isString()
      .notEmpty()
      .isLength({ min: 2, max: 50})
      .trim()
      .toLowerCase(),
    body('lastName')
      .isString()
      .notEmpty()
      .isLength({ min: 2, max: 50})
      .trim()
      .toLowerCase(),
    body('email')
      .isEmail()
      .notEmpty()
      .trim()
      .custom((value, { req }) => {
        return userModel.findOne({ email: value })
          .then(user => {
            if(user) {
              return Promise.reject('email already in use')
            }
          })
      })
      .normalizeEmail()
      .toLowerCase(),
    body('phoneNo')
      .isMobilePhone()
      .notEmpty()
      .trim()
      .toLowerCase(),
    body('password')
      .isStrongPassword()
      .notEmpty()
      .trim(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if(value !== req.body.password) {
          throw new Error('Email does not match')
        }
        return true
      })
  ],
  userController.signUp
)

router.post(
  '/login',
  [
    body('email')
    .not()
    .isEmpty()
    .isEmail()
    .custom((value, { req }) => {
      return userModel.findOne({ email: value })
        .then(result => {
          if(!result) {
            return Promise.reject('email does not exist')          
          }
          req.user = result
        })
    })
    .normalizeEmail(),
    body('password')
      .notEmpty()
      .trim()
  ],
  userController.login
)

module.exports = router
