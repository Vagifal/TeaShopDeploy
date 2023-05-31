const router = require('express').Router();
const orderController = require('../controllers/orderController');
const auth = require('../authentication/auth');
const authAdmin = require('../authentication/authAdmin');

router.route('/')
    .get(auth, authAdmin, orderController.getOrders)
    .post(auth, orderController.createOrder);

module.exports = router;