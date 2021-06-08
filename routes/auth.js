const express = require('express')
const AuthController = require('../controllers/authController')
const ValidateAuth = require('../handlers/validator/auth-validator')

const router = express.Router()

router.post(
  '/sign-up',
  ValidateAuth.REGISTER,
  AuthController.signUp
)

router.post(
  '/login',
  ValidateAuth.LOGIN,
  AuthController.login
)

module.exports = router
