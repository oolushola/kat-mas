const express = require('express')
const userController = require('../controllers/userController')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/userValidator')

const router = express.Router()

router.patch(
  '/guarantor',
  Middleware.checkAuth,
  Middleware.transporterOnly,
  Validate.GUARANTOR,
  userController.guarantorUpdate
)

router.patch(
  '/next-of-kin',
  Middleware.checkAuth,
  Middleware.transporterOnly,
  Validate.NEXT_OF_KIN,
  userController.nextOfKinUpdate
)

router.patch(
  '/upload/photo',
  Middleware.checkAuth,
  userController.uploadPhoto
)

router.patch(
  '/account-details',
  Middleware.checkAuth,
  Middleware.transporterOnly,
  Validate.ACCOUNT_DETAILS,
  userController.accountDetails
)

module.exports = router
