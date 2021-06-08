const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const authRoute = require('./auth')
const supportingDocumentRoute = require('./supportDocumentRoutes')

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/upload/supporting-documents', supportingDocumentRoute)

module.exports = router