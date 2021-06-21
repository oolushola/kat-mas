const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/trucks')
const trucksController = require('../controllers/trucksController')


router.post(
    '/create',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    trucksController.truckCreate
)

router.get(
    '/fetch-all',
    Middleware.checkAuth,
    Middleware.isStaff,
    trucksController.truckFetchAll)

router.get(
    '/fetch/:truckId',
    Middleware.checkAuth,
    Middleware.isStaff,
    trucksController.truckFetchOne)

router.patch(
    '/edit/:truckId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.UPDATE,
    trucksController.truckEdit)

router.delete(
    '/delete/:truckId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    trucksController.truckDelete
)


module.exports = router