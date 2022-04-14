const router = require('express').Router();
const cartController = require('../controllers/cart');
const { policies_check } = require('../middlewares/index');
const multer = require('multer');
const upload = multer();

router.put('/carts', upload.none(), policies_check('update', 'Cart'),  cartController.update);
router.get('/carts', policies_check('read', 'Cart'),  cartController.index);

module.exports = router;