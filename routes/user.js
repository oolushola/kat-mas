const express = require('express')
const userController = require('../controllers/userController')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/userValidator')

const router = express.Router()

router.patch(
  '/guarantor',
  Middleware.checkAuth,
  Middleware.checkUserType,
  Validate.GUARANTOR,
  userController.guarantorUpdate
)

router.patch(
  '/next-of-kin',
  Middleware.checkAuth,
  Middleware.checkUserType,
  Validate.NEXT_OF_KIN,
  userController.nextOfKinUpdate
)

module.exports = router
