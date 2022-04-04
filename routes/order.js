const router = require('express').Router();
const multer = require('multer');
const orderController = require('../controllers/order');
const { policies_check } = require('../middlewares/index');
const upload = multer();

router.post('/orders', upload.none(), policies_check('create', 'Order'), orderController.store);
router.get('/orders', policies_check('read', 'Order'), orderController.index);

module.exports = router;