const router = require('express').Router()

const auth = require('../middlewares/auth')
const productController = require('../controllers/productController')

router.route('/')
    .get(auth ,productController.getProducts )
    .post(auth , productController.createProduct)



router.route('/:id')
    .get(auth , productController.getProduct)
    .put(auth , productController.updateProduct)
    .delete(auth , productController.deleteProduct)

module.exports = router


