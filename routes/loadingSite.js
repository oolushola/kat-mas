const express = require('express')
const { body } = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/loadingSite')
const loadingSiteController = require('../controllers/loadingSiteController')


const router = express.Router()

router.post(
    '/loading-site',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    loadingSiteController.loadingSiteCreate
)

router.get(
    '/loading-sites',
    Middleware.checkAuth,
    Middleware.isStaff,
    loadingSiteController.loadingSiteFetchAll
)

router.get(
    '/loading-site/:siteId',
    Middleware.checkAuth,
    Middleware.isStaff,
    loadingSiteController.loadingSiteFetch
)

router.patch(
    'loading-site/:siteId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    loadingSiteController.loadingSiteEdit
)

router.delete(
    '/loading-site/:siteId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    loadingSiteController.loadingSiteDelete
)


module.exports = router