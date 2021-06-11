const express = require('express')
const Middleware = require('../handlers/middleware/middleware')
const TonnageController = require('../controllers/tonnageController')
const Tonnage = require('../models/tonnage')
const TonnageValidator = require('../handlers/validator/tonnage')

const router = express.Router()

router.get(
  '/tonnage',
  Middleware.checkAuth,
  TonnageController.tonnages
)

router.post(
  '/tonnage',
  Middleware.checkAuth,
  Middleware.isAdmin,
  TonnageValidator.ADD_TONNAGE,
  TonnageController.createTonnage
)

router.get(
  '/tonnage/:tonnageId',
  Middleware.checkAuth,
  TonnageController.getTonnage
)

router.put(
  '/tonnage/:tonnageId',
  Middleware.checkAuth,
  Middleware.isAdmin,
  TonnageValidator.UPDATE_TONNAGE,
  TonnageController.updateTonnage
)

module.exports = router

