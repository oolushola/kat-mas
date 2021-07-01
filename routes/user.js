const express = require('express')
const userController = require('../controllers/userController')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/userValidator')
const AssignmentController = require('../controllers/userAssignmentController')

const router = express.Router()

router.patch(
  '/guarantor',
  Middleware.checkAuth,
  Middleware.isTransporter,
  Validate.GUARANTOR,
  userController.guarantorUpdate
)

router.patch(
  '/next-of-kin',
  Middleware.checkAuth,
  Middleware.isTransporter,
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
  Middleware.isTransporter,
  Validate.ACCOUNT_DETAILS,
  userController.accountDetails
)

router.patch(
  '/products',
  Middleware.checkAuth,
  Middleware.isAdmin,
  Validate.ASSIGN_PRODUCTS,
  AssignmentController.assignProducts
)

router.patch(
  '/loading-site',
  Middleware.checkAuth,
  Middleware.isAdmin,
  Validate.ASSIGN_LOADING_SITES,
  AssignmentController.assignLoadingSites
)

router.get(
  '/business',
  Middleware.checkAuth,
  Middleware.isAdmin,
  AssignmentController.getBusinessDetails
)

router.delete(
  '/products',
  Middleware.checkAuth,
  Middleware.isAdmin,
  Validate.ASSIGN_PRODUCTS,
  AssignmentController.removeProducts
)


module.exports = router
