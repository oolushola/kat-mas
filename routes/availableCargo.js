const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/availableCargo')
const availableCargoController = require('../controllers/availableCargoController')


router.post(
    '/available-cargo',
    Middleware.checkAuth,
    Middleware.isAdminAndOps,
    Validate.CREATE,
    availableCargoController.availableCargoCreate
)

router.get(
    '/available-cargos',
    Middleware.checkAuth,
    Middleware.isAdminAndOps,
    availableCargoController.availableCargoFetchAll
)

router.get(
    '/available-cargo/:cargoId',
    Middleware.checkAuth,
    Middleware.isAdminAndOps,
    availableCargoController.availableCargoFetchOne
)

router.patch(
    '/available-cargo/:cargoId',
    Middleware.checkAuth,
    Middleware.isAdminAndOps,
    Validate.UPDATE,
    availableCargoController.availableCargoEdit
)

router.delete(
    '/available-cargo/:cargoId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    availableCargoController.availableCargoDelete
)


module.exports = router