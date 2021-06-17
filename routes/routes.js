const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const authRoute = require('./auth')
const loadingSiteRoute = require('./loadingSite')
const supportingDocumentRoute = require('./supportDocument')
const tonnageRoute = require('./tonnage')
const productRoute = require('./product')

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/upload/supporting-documents', supportingDocumentRoute)
router.use('/loading-site', loadingSiteRoute)
router.use(tonnageRoute)
router.use('/product', productRoute)

module.exports = router