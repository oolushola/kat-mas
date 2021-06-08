const express = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/userController')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/userValidator')
const SupportingDocumentController = require('../controllers/supportingDocumentController')

const router = express.Router()

router.patch(
  '/nin',
  Middleware.checkAuth,
  Middleware.transporterOnly,
  SupportingDocumentController.uploadNin
)

router.patch(
  '/proof-of-address',
  Middleware.checkAuth,
  Middleware.transporterOnly,
  SupportingDocumentController.uploadProofOfAddress
)

router.patch(
  '/guarantor-id',
  Middleware.checkAuth,
  Middleware.transporterOnly,
  SupportingDocumentController.uploadGurantorProofOfId
)

router.patch(
  '/guarantor-work-id',
  Middleware.checkAuth,
  Middleware.transporterOnly,
  SupportingDocumentController.uploadGuarantorWorkId
)

module.exports = router