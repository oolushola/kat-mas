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

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/upload/supporting-documents', supportingDocumentRoute)
router.use('/loading-site', loadingSiteRoute)
router.use(tonnageRoute)
router.use('/product', productRoute)
router.use('/truck-type', truckTypeRoute)
router.use('/trucks', trucksRoute)

module.exports = router