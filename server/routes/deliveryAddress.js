const { policies_check } = require('../middlewares');
const deliveryAddressController = require('../controllers/deliveryAddress');
const router = require('express').Router();
const multer = require('multer');
const upload = multer();

router.get('/deliveryAddress', policies_check('read', 'DeliveryAddress'), deliveryAddressController.index);
router.post('/delivery-addresses', upload.none(), policies_check('create', 'DeliveryAddress'), deliveryAddressController.store);
router.put('/delivery-addresses/:id', upload.none(), policies_check('update', 'DeliveryAddress'), deliveryAddressController.update);
router.delete('/delivery-addresses/:id', policies_check('delete', 'DeliveryAddress'), deliveryAddressController.destroy);

module.exports = router;