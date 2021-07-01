const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/trucks')
const trucksController = require('../controllers/trucksController')


router.post(
    '/truck',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    trucksController.truckCreate
)

router.get(
    '/trucks',
    Middleware.checkAuth,
    Middleware.isStaff,
    trucksController.truckFetchAll)

router.get(
    '/truck/:truckId',
    Middleware.checkAuth,
    Middleware.isStaff,
    trucksController.truckFetchOne)

router.patch(
    '/truck/:truckId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.UPDATE,
    trucksController.truckEdit)

router.delete(
    '/truck/:truckId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    trucksController.truckDelete
)


module.exports = router