const express = require('express')
const { body } = require('express-validator')
const Validate = require('../handlers/validator/truckType')
const Middleware = require('../handlers/middleware/middleware')
const truckTypeController = require('../controllers/truckTypeController')
const router = express.Router()

router.post(
    '/truck-type',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    truckTypeController.truckTypeCreate
)

router.get(
    '/truck-types',
    Middleware.checkAuth,
    Middleware.isStaff,
    truckTypeController.truckTypeFetchAll
)

router.get(
    '/truck-type/:truckTypeId',
    Middleware.checkAuth,
    Middleware.isStaff,
    truckTypeController.truckTypeFetchOne
)

router.patch(
    '/truck-type/:truckTypeId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.UPDATE,
    truckTypeController.truckTypeEdit
)

router.delete(
    '/truck-type/:truckTypeId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    truckTypeController.truckTypeDelete
)


module.exports = router