const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../authentication/auth');
const authAdmin = require('../authentication/authAdmin');

router.route('/')
    .get(categoryController.getCategories)
    .post(auth, authAdmin, categoryController.createCategory);

router.route('/:id')
    .delete(auth, authAdmin, categoryController.deleteCategory)
    .put(auth, authAdmin, categoryController.updateCategory);

module.exports = router;