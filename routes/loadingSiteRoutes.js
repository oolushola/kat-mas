const express = require('express')
const { body } = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/loadingSite-validator')
const loadingSiteController = require('../controllers/loadingSiteController')


const router = express.Router()

router.post(
    '/create',
    Middleware.checkAuth,
    Validate.CREATE,
    loadingSiteController.loadingSiteCreate
)

router.get(
    '/fetch-all',
    Middleware.checkAuth,
    loadingSiteController.loadingSiteFetchAll
)

router.get(
    '/fetch/:siteId',
    Middleware.checkAuth,
    loadingSiteController.loadingSiteFetch
)

router.patch(
    '/edit/:siteId',
    Middleware.checkAuth,
    loadingSiteController.loadingSiteEdit
)

router.delete(
    '/delete/:siteId',
    Middleware.checkAuth,
    loadingSiteController.loadingSiteDelete
)


module.exports = router