const router = require('express').Router();
const productController = require('../controllers/productController');
const auth = require('../authentication/auth');
const authAdmin = require('../authentication/authAdmin');

router.route('/')
    .get(productController.getProducts)
    .post(auth, authAdmin, productController.createProduct);

router.route('/:id')
    .delete(auth, authAdmin, productController.deleteProduct)
    .put(auth, authAdmin, productController.updateProduct);

module.exports = router;