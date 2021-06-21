const express = require('express')
const { body } = require('express-validator')
const Validate = require('../handlers/validator/truckType')
const Middleware = require('../handlers/middleware/middleware')
const truckTypeController = require('../controllers/truckTypeController')
const router = express.Router()

router.post(
    '/create',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    truckTypeController.truckTypeCreate
)

router.get(
    '/fetch-all',
    Middleware.checkAuth,
    Middleware.isStaff,
    truckTypeController.truckTypeFetchAll
)

router.get(
    '/fetch/:truckTypeId',
    Middleware.checkAuth,
    Middleware.isStaff,
    truckTypeController.truckTypeFetchOne
)

router.patch(
    '/edit/:truckTypeId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.UPDATE,
    truckTypeController.truckTypeEdit
)

router.delete(
    '/delete/:truckTypeId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    truckTypeController.truckTypeDelete
)


module.exports = router