const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../authentication/auth');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/refreshToken', userController.refreshToken);

router.get('/info', auth, userController.getUser);

router.patch('/addBasket', auth, userController.addBasket);

router.get('/orders', auth, userController.getOrders);

module.exports = router;