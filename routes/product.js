const express = require('express')
const { body } = require('express-validator')
const Middleware = require('../handlers/middleware/middleware')
const Validate = require('../handlers/validator/product')
const productController = require('../controllers/productController')
const router = express.Router()


router.post(
    '/product',
    Middleware.checkAuth,
    Middleware.isAdmin,
    Validate.CREATE,
    productController.productCreate
)

router.get(
    '/products',
    Middleware.checkAuth,
    Middleware.isStaff,
    productController.productFetchAll
)

router.get(
    '/product/:productId',
    Middleware.checkAuth,
    Middleware.isStaff,
    productController.productFetchOne
)

router.patch(
    '/product/:productId',
    Middleware.checkAuth,
    Middleware.isAdmin,
    productController.productEdit
)

router.delete(
    '/product/:productId',
    Middleware.checkAuth,
    Middleware.isSuperAdmin,
    productController.productDelete
)



module.exports = router