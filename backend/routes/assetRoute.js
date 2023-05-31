const router = require('express').Router();
const auth = require('../authentication/auth');
const authAdmin = require('../authentication/authAdmin');
const assetController = require('../controllers/assetController');

router.post('/upload', auth, authAdmin, assetController.uploadAsset);

router.post('/delete', auth, authAdmin, assetController.deleteAsset);

module.exports = router;