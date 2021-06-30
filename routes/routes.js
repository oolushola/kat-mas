const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const authRoute = require('./auth')
const loadingSiteRoute = require('./loadingSite')
const supportingDocumentRoute = require('./supportDocument')
const tonnageRoute = require('./tonnage')
const productRoute = require('./product')
const truckTypeRoute = require('./truckType')
const trucksRoute = require('./trucks')
const availableCargoRoute = require('./availableCargo')

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/upload/supporting-documents', supportingDocumentRoute)
router.use(
  tonnageRoute, 
  loadingSiteRoute, 
  productRoute, 
  truckTypeRoute, 
  trucksRoute, 
  availableCargoRoute
)

module.exports = router



