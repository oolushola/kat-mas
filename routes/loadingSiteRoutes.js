const express = require('express')
const { body } = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/loadingSite-validator')
const loadingSiteController = require('../controllers/loadingSiteController')


const router = express.Router()

router.post(
    '/create',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    loadingSiteController.loadingSiteCreate
)

router.get(
    '/fetch-all',
    Middleware.checkAuth,
    Middleware.isStaff,
    loadingSiteController.loadingSiteFetchAll
)

router.get(
    '/fetch/:siteId',
    Middleware.checkAuth,
    Middleware.isStaff,
    loadingSiteController.loadingSiteFetch
)

router.patch(
    '/edit/:siteId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    loadingSiteController.loadingSiteEdit
)

router.delete(
    '/delete/:siteId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    loadingSiteController.loadingSiteDelete
)


module.exports = router