const express = require('express')
const { body } = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/product')
const productController = require('../controllers/productController')
const router = express.Router()


router.post(
    '/create',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    productController.productCreate
)

router.get(
    '/fetch-all',
    Middleware.checkAuth,
    Middleware.isStaff,
    productController.productFetchAll
)

router.get(
    '/fetch/:productId',
    Middleware.checkAuth,
    Middleware.isStaff,
    productController.productFetchOne
)

router.patch(
    '/edit/:productId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    productController.productEdit
)

router.delete(
    '/delete/:productId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    productController.productDelete
)



module.exports = router