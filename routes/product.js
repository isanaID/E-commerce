const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const productController = require('../controllers/product');
const { policies_check } = require('../middlewares/index');

router.get('/products', productController.index);
router.post('/products', multer({dest: os.tmpdir()}).single('image'), policies_check('create', 'Product'), productController.store);
router.put('/products/:id', multer({dest: os.tmpdir()}).single('image'), policies_check('update', 'Product'), productController.update);
router.delete('/products/:id', policies_check('delete', 'Product'), productController.destroy);

module.exports = router;