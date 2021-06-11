const express = require('express')
const Middleware = require('../handlers/middleware/middleware')
const SupportingDocumentController = require('../controllers/supportingDocumentController')

const router = express.Router()

router.patch(
  '/nin',
  Middleware.checkAuth,
  Middleware.isTransporter,
  SupportingDocumentController.uploadNin
)

router.patch(
  '/proof-of-address',
  Middleware.checkAuth,
  Middleware.isTransporter,
  SupportingDocumentController.uploadProofOfAddress
)

router.patch(
  '/guarantor-id',
  Middleware.checkAuth,
  Middleware.isTransporter,
  SupportingDocumentController.uploadGurantorProofOfId
)

router.patch(
  '/guarantor-work-id',
  Middleware.checkAuth,
  Middleware.isTransporter,
  SupportingDocumentController.uploadGuarantorWorkId
)

module.exports = router