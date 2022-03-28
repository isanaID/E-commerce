const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const os = require('os');

const productController = require('../controllers/product');

router.post('/products', multer({dest: os.tmpdir()}).single('image'), productController.store);

module.exports = router;