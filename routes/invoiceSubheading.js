const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/invoiceSubheading')
const invoiceSubheadingController = require('../controllers/invoiceSubheadingController')


router.post(
    '/create',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    invoiceSubheadingController.invoiceSubheadingCreate
)

router.get(
    '/fetch-all',
    Middleware.checkAuth,
    Middleware.isAdmin,
    invoiceSubheadingController.invoiceSubheadingFetchAll
)

router.get(
    '/fetch/:invoiceId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    invoiceSubheadingController.invoiceSubheadingFetchOne
)

router.patch(
    '/edit/:invoiceId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.UPDATE,
    invoiceSubheadingController.invoiceSubheadingEdit
)

router.delete(
    '/delete/:invoiceId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    invoiceSubheadingController.invoiceSubheadingDelete
)

module.exports = router